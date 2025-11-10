from pydantic import BaseModel, Field
from typing import List, Optional


class RecipeIn(BaseModel):
    title: str
    description: str
    ingredients: List[str]
    instructions: List[str]
    tags: List[str]
    source: Optional[str] = None
    image: Optional[str] = None
    status: str = "completed"       # defaults as completed for manually inputted recipes
    video_path: Optional[str] = None
    owner_id: Optional[str] = None  # to track which user owns the recipe
    public: bool = True             # default public recipes


class Recipe(RecipeIn):
    id: Optional[str] = Field(default=None, alias="_id")    # MongoDB ObjectId

    

example1 = Recipe(
        recipe_id = 0,
        title = "Pad See Ew by derekkchen",
        description="A popular Thai stir-fried noodle dish known for its chewy noodles and balanced, savory-sweet flavor",
        ingredients = [
            "0.5 lbs chicken thigh(sliced)",
            "1 tsp light soy sauce",
            "1 tsp oyster sauce",
            "1 tsp cornstarch",
            "1 lbs fresh rice noodles",
            "4 cloves garlic(minced)",
            "2 to 3 Chinese broccoli(sliced)",
            "2 eggs",
            "Neutral oil"
        ],
        instructions = [
            "1. Cut chicken thigh into bite sized pieces and marinate with soy sauce, oyster sauce, cornstarch and 1 tsp of oil.",
            "2. Combine sauce ingredients.",
            "3. Mince garlic and prep Chinese broccoli by separating the stem from the leafy portion. Slice each into bite sized pieces.",
            "4. Heat 2 tbsp oil in a hot wok until smoking and sauté chicken for 4-5 minutes until seared and about 80 percent cooked through.",
            "5. Remove the chicken and add 1 tbsp oil to the wok. Sauté garlic with sliced broccoli stem and stir fry for 1-2 minutes before adding the leafy portion.",
            "6. Once the leafy portion is wilted, move the contents to the side of the wok, add 1 tbsp of oil, and fry 2 eggs. Mix to scramble and set aside.",
            "7. Add 2 tbsp oil to the hot wok and combine rice noodles with the sauce. Once combined, incorporate the chicken and broccoli stir fry and gently stir for 1-2 minutes.",
            "8. Enjoy with sliced Thai chillies+vinegar."
        ],
        tags = ["padseeew", "thai", "noodles", "quick"],
        source = "https://www.tiktok.com/@derekkchen/video/7383002445821087018",
        image = "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2FPhoto%2FRecipes%2F2024-05-pad-see-ew%2Fpad-see-ew-357",
)

example2 = Recipe(
    recipe_id = 1,
    title = "Nuoc Cham by nuocmamafoods",
    description = "A staple Vietnamese dipping sauce known for its perfectly balanced combination of sweet, sour, salty, and spicy flavors.",
    ingredients = [
        "1 cup white sugar",
        "1 cup fish sauce ( 3 crabs 🦀 🦀 🦀 brand )",
        "2.5 cup boiled water ( warm or cool )",
        "2-3 tablespoon minced garlic",
        "2-3 tablespoon fresh lime juice",
        "1 tablespoon white vinegar(help keep sauce fresher and longer)",
        "1 tablespoon chili paste 🌶 (rooster brand)",
        "fresh chopped chili 🌶 (optional)",
        "lime pulp (optional)",
    ],
    instructions = [
        "Mix well together until sugar dissolved.",
        "Taste and adjust. Let sauce cool completely. Put in a container and store in the refrigerator. Stay good for months.(3-4 or more). You can split the recipe in half.",
    ],
    tags = ["vietnamese", "sauce", "cracksauce"],
    source = "https://www.tiktok.com/t/ZT6TYYU2q/",
    image = "https://fullofplants.com/wp-content/uploads/2024/01/Vietnamese-Dipping-Sauce-Nuoc-Cham-12.jpg"
)

example3 = Recipe(
    recipe_id = 2,
    title = "Larb Gai by derekkchen",
    description = "A spicy, herbaceous, and savory Thai and Laotian minced chicken salad. It is known for its bold balance of salty, sour, spicy, and umami flavors",
    ingredients = [
        "1lbs ground pork or chicken",
        "Salt to taste",
        "3 tbsp Thai sticky rice",
        "3 small shallots(sliced)",
        "2 scallions(sliced)",
        "4 leaves culantro(sliced)",
        "Cilantro(small handful)",
        "Mint(small handful)",
        "Thai Basil(small handful)",
        "1 tbsp Thai chili flakes",
        "1/2 tbsp palm sugar",
        "1 tbsp fish sauce",
        "3 limes",
        "Cabbage",
        "Cucumber",
    ],
    instructions = [
        "Slice shallots, scallions, culantro/cilantro and pluck mint leaves and Thai basil leaves.",
        "Combine chili flakes with palm sugar, fish sauce, and lime juice.",
        "In a dry pan, toast Thai sticky rice on medium heat until golden brown(8-10 minutes). Grind in a mortar and pestle until it turns into a powder.",
        "On medium heat, sauté the mince for 8-10 minutes making sure to season with salt.",
        "Once cooked through but not browned, add the mince to a bowl with the toasted rice powder, shallots, scallion, herbs, and the sauce.",
        "Give it a mix and taste to adjust for seasoning.",
        "Serve with cabbage and cucumber.",
    ],
    tags = ["larb", "thai", "salad"],
    source = "https://www.tiktok.com/t/ZT6TFK1vq/",
    image = "https://hot-thai-kitchen.com/wp-content/uploads/2016/06/laab-gai-sq-1.jpg"
)

my_recipes = [example1, example2, example3]