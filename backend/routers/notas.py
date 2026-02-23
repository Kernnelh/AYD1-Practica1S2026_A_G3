from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models
import schemas

# Creamos el router para agrupar todas las URLs que empiecen con /notas
router = APIRouter(
    prefix="/notas",
    tags=["Notas"]
)

# Endpoint para OBTENER todas las notas (Método GET)
@router.get("/", response_model=List[schemas.NotaResponse])
def obtener_notas(db: Session = Depends(get_db)):
    # Le decimos a SQLAlchemy que traiga todos los registros de la tabla Notas
    notas = db.query(models.Nota).all()
    return notas

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