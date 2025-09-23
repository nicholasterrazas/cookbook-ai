from fastapi import FastAPI, HTTPException
from models.recipe import Recipe, my_recipes

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Welcome to Cookbook AI"}



@app.get("/recipes/{recipe_id}", response_model=Recipe)
async def get_recipe(recipe_id: int):
    if not (0 <= recipe_id < len(my_recipes)):
        raise HTTPException(status_code=404, detail="Recipe not found")
    
    return my_recipes[recipe_id]

@app.get("/recipes", response_model=list[Recipe])
async def get_recipes():
    return my_recipes