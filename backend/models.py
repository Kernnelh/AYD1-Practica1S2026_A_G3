from sqlalchemy import Column, Integer, String, Text, Boolean, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from database import Base


class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    usuario = Column(String(50), nullable=False, unique=True)
    password = Column(String(255), nullable=False)


class Nota(Base):
    __tablename__ = "notas"

    id = Column(Integer, primary_key=True, index=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id", ondelete="CASCADE"), nullable=False)
    titulo = Column(String(150), nullable=False)
    descripcion = Column(Text, nullable=True)
    es_fijado = Column(Boolean, default=False)
    es_archivado = Column(Boolean, default=False)
    creado_en = Column(TIMESTAMP, server_default=func.now())
    editado_en = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())
