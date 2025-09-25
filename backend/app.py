from fastapi import FastAPI, File, UploadFile, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from models.recipe import Recipe, RecipeIn
import shutil
import os
import db
import asyncio


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"

if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR) 


@app.get("/")
def root():
    return {"message": "Welcome to Cookbook AI"}


async def process_video(recipe_id, file_path):
    # fake processing for now
    # TODO: replace later with speech-to-text + NLP later
    await asyncio.sleep(5)

    processed_recipe = RecipeIn(
        title="Spaghetti Bolognese",
        description="Classic Italian pasta dish",
        ingredients=["Spaghetti noodles", "Ground beef", "Tomato sauce"],
        instructions=["Boil pasta", "Cook beef", "Mix pasta, sauce, and beef together"],
        tags=["Italian", "easy", "pasta"],
        image="https://www.kitchensanctuary.com/wp-content/uploads/2019/09/Spaghetti-Bolognese-square-FS-0204.jpg",
        status="completed",
        video_path=file_path
    )

    await db.update_recipe(recipe_id, processed_recipe)



@app.post("/recipes/upload-video")
async def upload_video(file: UploadFile, background_tasks: BackgroundTasks):
    if file.content_type != "video/mp4":
        raise HTTPException(status_code=400, detail="Only MP4 files are supported")
    
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    placeholder_recipe = RecipeIn(
        title="Processing...",
        description="This recipe is being generated from the uploaded video.",
        ingredients=[],
        instructions=[],
        tags=[],
        source=None,
        image=None,
        status="processing",
        video_path=file_path
    )

    # upload the placeholder so that we can access its id from MongoDB
    # so we can poll for the id once the recipe is done being processed 
    recipe_in_progress = await db.create_recipe(placeholder_recipe)
    recipe_id = recipe_in_progress.id


    background_tasks.add_task(process_video, recipe_id, file_path)

    return recipe_in_progress


@app.get("/recipes", response_model=list[Recipe])
async def get_recipes():
    return await db.retrieve_recipes()


@app.get("/recipes/{recipe_id}", response_model=Recipe)
async def get_recipe(recipe_id: str):
    recipe = await db.retrieve_recipe(recipe_id)
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return recipe


@app.post("/recipes", response_model=Recipe)
async def add_recipe(recipe: RecipeIn):
    return await db.create_recipe(recipe)


@app.put("/recipes/{recipe_id}", response_model=Recipe)
async def edit_recipe(recipe_id: str, recipe: RecipeIn):
    updated = await db.update_recipe(recipe_id, recipe)
    if not updated:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return updated


@app.delete("/recipes/{recipe_id}")
async def remove_recipe(recipe_id: str):
    deleted = db.delete_recipe(recipe_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return {"message": "Recipe deleted"}

