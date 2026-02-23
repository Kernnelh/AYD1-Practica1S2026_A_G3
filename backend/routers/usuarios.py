from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas
import hashlib

router = APIRouter(
    prefix="/usuarios",
    tags=["Usuarios"]
)


def hashear_password(password: str) -> str:
    """Genera un hash SHA-256 de la contrasena."""
    return hashlib.sha256(password.encode()).hexdigest()


# -------------------------------------------------------
# Registro de usuario
# -------------------------------------------------------

@router.post("/registro", response_model=schemas.UsuarioResponse, status_code=status.HTTP_201_CREATED)
def registrar_usuario(datos: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    try:
        # Verificar que el nombre de usuario no exista ya en la base de datos
        usuario_existente = db.query(models.Usuario).filter(
            models.Usuario.usuario == datos.usuario
        ).first()

        if usuario_existente:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="El nombre de usuario ya esta en uso"
            )

        # Hashear la contrasena antes de guardarla
        password_hasheada = hashear_password(datos.password)

        nuevo_usuario = models.Usuario(
            usuario=datos.usuario,
            password=password_hasheada
        )

        db.add(nuevo_usuario)
        db.commit()
        db.refresh(nuevo_usuario)

        return nuevo_usuario

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error al registrar el usuario: {str(e)}")


# -------------------------------------------------------
# Login de usuario
# -------------------------------------------------------

@router.post("/login", response_model=schemas.UsuarioResponse)
def login_usuario(datos: schemas.UsuarioLogin, db: Session = Depends(get_db)):
    try:
        # Buscar el usuario en la base de datos
        usuario = db.query(models.Usuario).filter(
            models.Usuario.usuario == datos.usuario
        ).first()

        if not usuario:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Credenciales incorrectas"
            )

        # Comparar la contrasena ingresada con el hash guardado
        password_ingresada = hashear_password(datos.password)

        if usuario.password != password_ingresada:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Credenciales incorrectas"
            )

        return usuario

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al iniciar sesion: {str(e)}")


# -------------------------------------------------------
# Editar perfil de usuario
# -------------------------------------------------------

@router.put("/{id_usuario}", response_model=schemas.UsuarioResponse)
def editar_usuario(id_usuario: int, datos: schemas.UsuarioUpdate, db: Session = Depends(get_db)):
    try:
        # Buscar el usuario por ID
        usuario = db.query(models.Usuario).filter(
            models.Usuario.id == id_usuario
        ).first()

        if not usuario:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Usuario no encontrado"
            )

        # Si se quiere cambiar el nombre de usuario, verificar que no lo use otro
        if datos.usuario is not None:
            nombre_en_uso = db.query(models.Usuario).filter(
                models.Usuario.usuario == datos.usuario,
                models.Usuario.id != id_usuario
            ).first()

            if nombre_en_uso:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="El nombre de usuario ya esta en uso por otra cuenta"
                )

            usuario.usuario = datos.usuario

        # Si se quiere cambiar la contrasena, la hasheamos antes de guardar
        if datos.password is not None:
            usuario.password = hashear_password(datos.password)

        db.commit()
        db.refresh(usuario)

        return usuario

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error al editar el usuario: {str(e)}")
