from deep_translator import GoogleTranslator
from fastapi import FastAPI,Form
import uvicorn


app = FastAPI()

@app.post("/transalte")
def translate(text:str = Form(...)):
    translated = GoogleTranslator(source='en', target='km').translate(text)
    return {"message":translated}


if __name__ == "__main__":
    uvicorn.run(app, host= "192.168.12.161", port=8000)