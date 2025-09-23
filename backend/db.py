from motor.motor_asyncio import AsyncIOMotorClient
from models.recipe import Recipe
from bson import ObjectId


MONGO_URI = "mongodb://localhost:27017"
client = AsyncIOMotorClient(MONGO_URI)

db = client["cookbook_ai"]
recipe_collection = db["recipes"]


async def create_recipe(recipe: Recipe) -> dict:
    recipe_dict = recipe.model_dump(by_alias=True, exclude={"id"})
    result = await recipe_collection.insert_one(recipe_dict)
    recipe_dict["_id"] = str(result.inserted_id)    
    
    return recipe_dict


async def retrieve_recipes() -> list[dict]:
    recipes = []
    async for recipe in recipe_collection.find():
        recipe["_id"] = str(recipe["_id"])
        recipes.append(recipe)

    return recipes


async def retrieve_recipe(recipe_id: str) -> dict | None:
    recipe = await recipe_collection.find_one({"_id": ObjectId(recipe_id)})
    
    if not recipe:
        return None
    else:
        recipe["_id"] = str(recipe["_id"])
        return recipe
    

async def update_recipe(recipe_id: str, new_recipe: Recipe) -> dict | None:
    update_data = new_recipe.model_dump(by_alias=True, exclude_unset=True, exclude="id")
    result = await recipe_collection.update_one(
        {"_id": ObjectId(recipe_id)}, {"$set": update_data}
    )
    if result.matched_count == 0:
        return None
    else:
        updated_recipe = await recipe_collection.find_one({"_id": ObjectId(recipe_id)})
        updated_recipe["_id"] = str(updated_recipe["_id"])
        return updated_recipe
    

async def delete_recipe(recipe_id: str) -> bool:
    result = await recipe_collection.delete_one({"_id": ObjectId(recipe_id)})
    if result.deleted_count == 0:
        return False
    else:
        return True