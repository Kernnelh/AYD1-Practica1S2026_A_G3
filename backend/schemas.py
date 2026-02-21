from pydantic import BaseModel, Field
from typing import Optional

# Esquema que define qué datos debe enviar el Frontend para crear una nota
class NotaCreate(BaseModel):
    id_usuario: int
    #min_length=1 evita que el título esté vacío
    titulo: str = Field(..., min_length=1, description="El título de la nota no puede ir vacío")
    descripcion: Optional[str] = None
    es_fijado: Optional[bool] = False
    es_archivado: Optional[bool] = False

# Esquema para cuando devolvemos la nota ya creada (incluye el ID)
class NotaResponse(NotaCreate):
    id: int

    class Config:
        from_attributes = True