from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from typing import Optional
from database import get_db
import models
import schemas

# Creamos el router para agrupar todas las URLs que empiecen con /notas
router = APIRouter(
    prefix="/notas",
    tags=["Notas"]
)

# --- ENDPOINT MODIFICADO: OBTENER NOTAS (CON FILTRO DE USUARIO) ---
@router.get("/", response_model=list[schemas.NotaResponse])
def leer_notas(usuario_id: Optional[int] = None, db: Session = Depends(get_db)):
    # Si el frontend nos manda un usuario_id, filtramos la base de datos
    if usuario_id:
        notas_db = db.query(models.Nota).filter(models.Nota.id_usuario == usuario_id).all()
    # Si no nos manda nada, devolvemos todas (útil para el administrador en el futuro)
    else:
        notas_db = db.query(models.Nota).all()
        
    return notas_db

# Endpoint para AGREGAR una nota (Método POST)
@router.post("/", response_model=schemas.NotaResponse)
def crear_nota(nota: schemas.NotaCreate, db: Session = Depends(get_db)):
    try:
        # 1. Convertimos los datos validados por Pydantic al modelo de SQLAlchemy
        nueva_nota = models.Nota(
            id_usuario=nota.id_usuario,
            titulo=nota.titulo,
            descripcion=nota.descripcion,
            es_fijado=nota.es_fijado,
            es_archivado=nota.es_archivado
        )
        
        # 2. Guardamos en la base de datos
        db.add(nueva_nota)
        db.commit()
        
        # 3. Refrescamos para obtener el ID y la fecha que MySQL generó automáticamente
        db.refresh(nueva_nota)
        
        return nueva_nota
        
    except Exception as e:
        db.rollback() # Si algo falla, deshacemos los cambios por seguridad
        raise HTTPException(status_code=500, detail=f"Error al crear la nota: {str(e)}")

# --- ENDPOINT NUEVO: MODIFICAR UNA NOTA (PUT) ---
@router.put("/{nota_id}", response_model=schemas.NotaResponse)
def modificar_nota(nota_id: int, nota_actualizada: schemas.NotaUpdate, db: Session = Depends(get_db)):
    # 1. Buscamos si la nota existe en la base de datos
    nota_db = db.query(models.Nota).filter(models.Nota.id == nota_id).first()
    
    # 2. Si no existe, devolvemos un error 404 (Not Found)
    if not nota_db:
        raise HTTPException(status_code=404, detail="La nota que intentas modificar no existe")
    
    # 3. Actualizamos solo los campos que el frontend nos envió
    if nota_actualizada.titulo is not None:
        nota_db.titulo = nota_actualizada.titulo
    if nota_actualizada.descripcion is not None:
        nota_db.descripcion = nota_actualizada.descripcion
    if nota_actualizada.es_fijado is not None:
        nota_db.es_fijado = nota_actualizada.es_fijado
    if nota_actualizada.es_archivado is not None:
        nota_db.es_archivado = nota_actualizada.es_archivado
        
    # 4. Guardamos los cambios en MySQL
    try:
        db.commit()
        db.refresh(nota_db)
        return nota_db
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error al modificar la nota: {str(e)}")

# --- ENDPOINT NUEVO: ELIMINAR UNA NOTA (DELETE) ---
@router.delete("/{nota_id}")
def eliminar_nota(nota_id: int, db: Session = Depends(get_db)):
    # 1. Buscamos si la nota existe
    nota_db = db.query(models.Nota).filter(models.Nota.id == nota_id).first()
    
    # 2. Si no existe, devolvemos un error 404
    if not nota_db:
        raise HTTPException(status_code=404, detail="La nota que intentas eliminar no existe")
    
    # 3. Eliminamos la nota de la base de datos
    try:
        db.delete(nota_db)
        db.commit()
        return {"mensaje": "Nota eliminada exitosamente"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error al eliminar la nota: {str(e)}")

# --- ENDPOINT: COMPARTIR UNA NOTA (POST) ---
@router.post("/{nota_id}/compartir")
def compartir_nota(nota_id: int, datos: schemas.CompartirNota, usuario_id_actual: int, db: Session = Depends(get_db)):
    # 1. Buscamos al usuario al que le queremos compartir la nota
    usuario_destino = db.query(models.Usuario).filter(models.Usuario.usuario == datos.usuario_a_compartir).first()
    
    if not usuario_destino:
        raise HTTPException(status_code=404, detail="El usuario ingresado no existe")
        
    # 2. Verificamos que no se la estemos compartiendo a la misma persona dos veces
    ya_compartida = db.query(models.NotaCompartida).filter(
        models.NotaCompartida.id_nota == nota_id,
        models.NotaCompartida.id_usuario_compartido == usuario_destino.id
    ).first()
    
    if ya_compartida:
        raise HTTPException(status_code=400, detail="La nota ya está compartida con este usuario")

    # 3. Guardamos el registro en la tabla intermedia
    nuevo_compartido = models.NotaCompartida(
        id_nota=nota_id,
        id_usuario=usuario_id_actual,
        id_usuario_compartido=usuario_destino.id
    )
    
    try:
        db.add(nuevo_compartido)
        db.commit()
        return {"mensaje": f"Nota compartida exitosamente con {usuario_destino.usuario}"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Error al compartir la nota")


# --- ENDPOINT: OBTENER NOTAS COMPARTIDAS CONMIGO (GET) ---
@router.get("/compartidas/{mi_usuario_id}", response_model=list[schemas.NotaResponse])
def leer_notas_compartidas(mi_usuario_id: int, db: Session = Depends(get_db)):
    # Hacemos un JOIN entre la tabla 'notas' y 'notas_compartidas'
    notas_prestadas = db.query(models.Nota).join(
        models.NotaCompartida, models.Nota.id == models.NotaCompartida.id_nota
    ).filter(
        models.NotaCompartida.id_usuario_compartido == mi_usuario_id
    ).all()
    
    return notas_prestadas