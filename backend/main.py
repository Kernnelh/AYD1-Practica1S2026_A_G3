from fastapi import FastAPI
from database import engine
from routers import notas
from routers import usuarios

app = FastAPI()

app.include_router(notas.router)
app.include_router(usuarios.router)


@app.get("/")
def read_root():
    return {"mensaje": "El backend de NoteCraft esta vivo y funcionando"}


@app.get("/test-db")
def test_db_connection():
    try:
        with engine.connect() as connection:
            return {"mensaje": "Conexion a MySQL exitosa"}
    except Exception as e:
        return {"error": f"Fallo la conexion: {str(e)}"}
