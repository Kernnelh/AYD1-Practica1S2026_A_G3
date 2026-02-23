from fastapi import FastAPI
from database import engine
from routers import notas  

app = FastAPI()

#Le decimos a FastAPI que use tus rutas de notas
app.include_router(notas.router) 

@app.get("/")
def read_root():
    return {"mensaje": "¡El backend de NoteCraft está vivo y funcionando!"}

@app.get("/test-db")
def test_db_connection():
    try:
        with engine.connect() as connection:
            return {"mensaje": "¡Conexión a MySQL exitosa!"}
    except Exception as e:
        return {"error": f"Falló la conexión: {str(e)}"}