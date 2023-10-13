from deep_translator import GoogleTranslator
from fastapi import FastAPI,Form

app = FastAPI()

@app.get("/")
async def root():
    return {"message":"welcome to translator api free"}

@app.post("/api/en-kh")
def translate(text:str = Form(...)):
    translated = GoogleTranslator(source='en', target='km').translate(text)
    return {"translated":translated}

@app.post("/api/kh-en")
def translate(text:str = Form(...)):
    translated = GoogleTranslator(source='km', target='en').translate(text)
    return {"translated":translated}
