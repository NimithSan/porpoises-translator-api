from fastapi import FastAPI, Form, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from deep_translator import GoogleTranslator

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/src", StaticFiles(directory="src"), name="src")

# Create an instance of Jinja2Templates for rendering HTML templates
templates = Jinja2Templates(directory="templates")


@app.get("/")
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.post("/api/translate", tags=["API"])
def translate_text(
    text: str = Form(...),
    src_language: str = Form(None),  # Making src_language optional
    target_language: str = Form(...),
):
    if src_language:
        translator = GoogleTranslator(source=src_language, target=target_language)
    else:
        translator = GoogleTranslator(source="auto", target=target_language)

    translated_text = translator.translate(text)
    return {"translated_text": translated_text}
