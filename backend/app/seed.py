# seed_db.py
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URI = "mongodb://localhost:27017"
DB_NAME = "cookbook_ai"
COLLECTION_NAME = "recipes"

sample_recipes = [
    {
        "title": "Pad See Ew by derekkchen",
        "description": "Thai stir-fried noodles with chicken and broccoli",
        "ingredients": [
            "0.5 lbs chicken thigh (sliced)",
            "1 tsp light soy sauce",
            "1 tsp oyster sauce",
            "1 tsp cornstarch",
            "1 lb fresh rice noodles",
            "4 cloves garlic (minced)",
            "2-3 Chinese broccoli (sliced)",
            "2 eggs",
            "Neutral oil"
        ],
        "instructions": [
            "Cut chicken thigh into bite sized pieces and marinate with soy sauce, oyster sauce, cornstarch and 1 tsp of oil.",
            "Combine sauce ingredients.",
            "Mince garlic and prep Chinese broccoli by separating the stem from the leafy portion.",
            "Heat oil in a hot wok until smoking and sauté chicken until about 80 percent cooked.",
            "Remove chicken, sauté garlic and broccoli stems, then add leaves.",
            "Scramble eggs in the wok, then add noodles and sauce.",
            "Return chicken and stir fry everything together briefly."
        ],
        "tags": ["thai", "noodles", "quick"],
        "source": "https://www.tiktok.com/@derekkchen/video/7383002445821087018",
        "image": "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2FPhoto%2FRecipes%2F2024-05-pad-see-ew%2Fpad-see-ew-357",
    },
    {
        "title": "Nuoc Cham by nuocmamafoods",
        "description": "Vietnamese dipping sauce with sweet, sour, salty, and spicy balance.",
        "ingredients": [
            "1 cup white sugar",
            "1 cup fish sauce",
            "2.5 cups boiled water",
            "2 tbsp minced garlic",
            "2-3 tbsp lime juice",
            "1 tbsp white vinegar",
            "1 tbsp chili paste"
        ],
        "instructions": [
            "Mix sugar, fish sauce, and water until sugar dissolves.",
            "Add garlic, lime juice, vinegar, and chili paste.",
            "Adjust to taste. Store in fridge for months."
        ],
        "tags": ["vietnamese", "sauce"],
        "source": "https://www.tiktok.com/t/ZT6TYYU2q/",
        "image": "https://fullofplants.com/wp-content/uploads/2024/01/Vietnamese-Dipping-Sauce-Nuoc-Cham-12.jpg",
    },
    {
        "title": "Larb Gai by derekkchen",
        "description": "Spicy, herbaceous Thai chicken salad with fresh herbs and toasted rice.",
        "ingredients": [
            "1 lb ground chicken",
            "Salt",
            "3 tbsp Thai sticky rice",
            "3 shallots (sliced)",
            "2 scallions (sliced)",
            "Mint leaves",
            "Cilantro",
            "Fish sauce",
            "Lime juice",
            "Chili flakes"
        ],
        "instructions": [
            "Toast rice until golden, grind to powder.",
            "Cook chicken with salt.",
            "Mix chicken with rice powder, shallots, scallions, herbs, fish sauce, lime, and chili flakes.",
            "Serve with cabbage or cucumber."
        ],
        "tags": ["thai", "salad"],
        "source": "https://www.tiktok.com/t/ZT6TFK1vq/",
        "image": "https://hot-thai-kitchen.com/wp-content/uploads/2016/06/laab-gai-sq-1.jpg",
    }
]


async def seed():
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[DB_NAME]
    collection = db[COLLECTION_NAME]

    # clear old data
    await collection.delete_many({})
    print("Cleared existing recipes.")

    # insert new sample data
    result = await collection.insert_many(sample_recipes)
    print(f"Inserted {len(result.inserted_ids)} recipes.")

    client.close()


if __name__ == "__main__":
    asyncio.run(seed())
