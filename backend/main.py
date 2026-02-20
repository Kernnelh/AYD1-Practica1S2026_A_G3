from fastapi import FastAPI
from database import engine

app = FastAPI()

@app.get("/")
def read_root():
    return {"mensaje": "¡El backend de NoteCraft está vivo y funcionando!"}

@app.get("/test-db")
def test_db_connection():
    try:
        # Intentamos abrir una conexión rápida al motor
        with engine.connect() as connection:
            return {"mensaje": "¡Conexión a MySQL exitosa"}
    except Exception as e:
        return {"error": f"Falló la conexión: {str(e)}"}