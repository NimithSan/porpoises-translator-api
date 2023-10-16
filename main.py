from fastapi import FastAPI, Form, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from deep_translator import GoogleTranslator


app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

# Create an instance of Jinja2Templates for rendering HTML templates
templates = Jinja2Templates(directory="templates") 

@app.get("/")
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/api/en-kh")
def translate(text:str = Form(...)):
    translated = GoogleTranslator(source='en', target='km').translate(text)
    return {"translated":translated}

#max translate khmer to eng is 1863 characters.
@app.post("/api/kh-en")
def translate(text:str = Form(...)):
    translated = GoogleTranslator(source='km', target='en').translate(text)
    return {"translated":translated}

