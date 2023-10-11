from deep_translator import GoogleTranslator
from fastapi import FastAPI,Form
from mangum import Mangum

app = FastAPI()

handler = Mangum(app)

@app.get("/")
async def root():
    return {"message":"welcome to translator api free"}

@app.post("/transaltor")
def translate(text:str = Form(...)):
    translated = GoogleTranslator(source='en', target='km').translate(text)
    return {"translated":translated}
