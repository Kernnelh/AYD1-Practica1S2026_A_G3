from pydantic import BaseModel, Field
from typing import Optional


# -------------------------------------------------------
# Schemas de Notas
# -------------------------------------------------------

class NotaCreate(BaseModel):
    id_usuario: int
    titulo: str = Field(..., min_length=1, description="El titulo de la nota no puede ir vacio")
    descripcion: Optional[str] = None
    es_fijado: Optional[bool] = False
    es_archivado: Optional[bool] = False


class NotaResponse(NotaCreate):
    id: int

    class Config:
        from_attributes = True


# -------------------------------------------------------
# Schemas de Usuarios
# -------------------------------------------------------

class UsuarioCreate(BaseModel):
    usuario: str = Field(..., min_length=3, max_length=50, description="Nombre de usuario, entre 3 y 50 caracteres")
    password: str = Field(..., min_length=4, description="La contrasena debe tener al menos 4 caracteres")


class UsuarioLogin(BaseModel):
    usuario: str = Field(..., min_length=1)
    password: str = Field(..., min_length=1)


class UsuarioUpdate(BaseModel):
    usuario: Optional[str] = Field(None, min_length=3, max_length=50)
    password: Optional[str] = Field(None, min_length=4, max_length=15)


class UsuarioResponse(BaseModel):
    id: int
    usuario: str

    class Config:
        from_attributes = True
