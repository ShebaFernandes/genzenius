from huggingface_hub import InferenceClient
from dotenv import load_dotenv
import pyttsx3
import os
from uuid import uuid4

load_dotenv()  # Load from .env file

HF_TOKEN = os.getenv("HF_TOKEN")

client = InferenceClient("mistralai/Mistral-7B-Instruct-v0.2", token=HF_TOKEN)

def generate_script(topic: str) -> str:
    prompt = f"Explain the topic '{topic}' in a simple and engaging way suitable for students."
    response = client.text_generation(prompt, max_new_tokens=300)
    return response

def generate_audio(text: str) -> str:
    engine = pyttsx3.init()
    filename = f"{uuid4()}.mp3"
    folder = "audio"
    filepath = os.path.join(folder, filename)

    os.makedirs(folder, exist_ok=True)
    engine.save_to_file(text, filepath)
    engine.runAndWait()

    return f"http://localhost:8000/audio/{filename}"
