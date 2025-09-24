from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models.recipe import Recipe, RecipeIn
import db

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Welcome to Cookbook AI"}


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

