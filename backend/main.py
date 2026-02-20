from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"mensaje": "¡El backend de NoteCraft está vivo y funcionando!"}