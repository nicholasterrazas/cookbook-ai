from motor.motor_asyncio import AsyncIOMotorClient
from models.recipe import Recipe, RecipeIn
from bson import ObjectId


MONGO_URI = "mongodb://localhost:27017"
client = AsyncIOMotorClient(MONGO_URI)

db = client["cookbook_ai"]
recipe_collection = db["recipes"]
recipe_collection.create_index("owner_id")


async def create_recipe(recipe: RecipeIn) -> Recipe:
    recipe_dict = recipe.model_dump()
    result = await recipe_collection.insert_one(recipe_dict)
    recipe_dict["_id"] = str(result.inserted_id)    
    
    return Recipe(**recipe_dict)


# Retrieve only owner's recipes
async def retrieve_recipes(owner_id) -> list[Recipe]:
    recipes = []
    async for recipe in recipe_collection.find({"owner_id": owner_id}):
        recipe["_id"] = str(recipe["_id"])
        recipes.append(Recipe(**recipe))

    return recipes


async def retrieve_recipe(recipe_id: str) -> Recipe | None:
    recipe = await recipe_collection.find_one({"_id": ObjectId(recipe_id)})
    
    if not recipe:
        return None
    else:
        recipe["_id"] = str(recipe["_id"])
        return Recipe(**recipe)
    

async def update_recipe(recipe_id: str, new_recipe: RecipeIn, owner_id: str) -> Recipe | None:
    update_data = new_recipe.model_dump(exclude_unset=True)
    if "owner_id" in update_data:   # prevent client from changin owner_id
        del update_data["owner_id"]

    result = await recipe_collection.update_one(
        {"_id": ObjectId(recipe_id), "owner_id": owner_id}, 
        {"$set": update_data}
    )
    if result.matched_count == 0:
        return None
    else:
        updated_recipe = await recipe_collection.find_one({"_id": ObjectId(recipe_id)})
        updated_recipe["_id"] = str(updated_recipe["_id"])
        return Recipe(**updated_recipe)
    

async def delete_recipe(recipe_id: str, owner_id: str) -> bool:
    result = await recipe_collection.delete_one(
        {"_id": ObjectId(recipe_id), "owner_id": owner_id}
    )
    return result.deleted_count > 0