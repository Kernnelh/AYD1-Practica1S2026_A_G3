from sqlalchemy import Column, Integer, String, Text, Boolean, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from database import Base

class Nota(Base):
    __tablename__ = "notas"

    id = Column(Integer, primary_key=True, index=True)
    id_usuario = Column(Integer, nullable=False) # Llave foránea hacia usuarios
    titulo = Column(String(150), nullable=False)
    descripcion = Column(Text, nullable=True)
    es_fijado = Column(Boolean, default=False)
    es_archivado = Column(Boolean, default=False)
    creado_en = Column(TIMESTAMP, server_default=func.now())
    editado_en = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())