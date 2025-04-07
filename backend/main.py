from fastapi import FastAPI
from pydantic import BaseModel
from api.script import generate_script, generate_audio  # You should create generate_audio in this module
from fastapi.middleware.cors import CORSMiddleware

from fastapi.staticfiles import StaticFiles
import os


app = FastAPI()
app.mount("/audio", StaticFiles(directory="audio"), name="audio")

app.add_middleware(
    CORSMiddleware,
    # allow_origins=["http://localhost:3000"],
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScriptRequest(BaseModel):
    topic: str

@app.post("/generate-script")
def script(request: ScriptRequest):
    return {"script": generate_script(request.topic)}

# 🚀 NEW: Add this route
@app.post("/generate-audio")
def audio(request: ScriptRequest):
    audio_url = generate_audio(request.topic)  # This should return a path or URL to audio
    return {"audio_url": audio_url}



@app.get("/ping")
def ping():
    return {"message": "pong"}
