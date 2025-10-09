from models.recipe import RecipeIn
import db
from whisper import Whisper
import ollama
import json

async def process_video(stt_model: Whisper, recipe_id, file_path):

    # Stage 1: speech to text to transcribe video
    transcription = stt_model.transcribe(file_path, fp16=False)["text"]
    print(f"Transcription:\n{transcription}")


    # Stage 2: LLM to identify ingredients, instructions, and tags
    query = f"""
    Extract a JSON object from this transcription with the following format: 
    title (string, name of the dish), 
    description (string),
    ingredients (list of strings),
    instructions (list of strings),
    tags (list of strings).

    Make reasonable corrections for these sections if there are any suspected typos within the transcription, and make reasonable inferences for the description 
    The final output will be just the JSON object ready to be loaded in by python's json.loads(), with the text starting with an open curly brace, and ending with a closed curly brace.
    Transcription:
    {transcription}
    """

    response = ollama.chat(model='gemma3', messages=[
        {
            "role": "user",
            "content": query
        }
    ])

    text = response.message.content 
    print(text)


    # Stage 3: convert LLM output to Recipe object
    try:
        structured_recipe = json.loads(text)
    except json.JSONDecodeError:
        structured_recipe = {"title": "Untitled"}

    print(structured_recipe)

    processed_recipe = RecipeIn(
        **structured_recipe,
        status="completed",
        video_path=file_path
    )

    await db.update_recipe(recipe_id, processed_recipe)