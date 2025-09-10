class Recipe {
    constructor({
        id = null,
        title = null,
        description = null,
        image = null, 
        ingredients = [], 
        instructions = [], 
        tags = [], 
        source = null,
        createdAt = new Date()
    }) {
        this.id = id;
        this.title = title;
        this.description = description,
        this.image = image;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.tags = tags;
        this.source = source;
        this.createdAt = createdAt;
    }
}


const example1 = new Recipe({
    id: 0,
    title: "Pad See Ew",
    description: "A popular Thai stir-fried noodle dish known for its chewy noodles and balanced, savory-sweet flavor",
    image: "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2FPhoto%2FRecipes%2F2024-05-pad-see-ew%2Fpad-see-ew-357",
});

const example2 = new Recipe({
    id: 1,
    title: "Nuoc Cham",
    description: "A staple Vietnamese dipping sauce known for its perfectly balanced combination of sweet, sour, salty, and spicy flavors.",
    image: "https://fullofplants.com/wp-content/uploads/2024/01/Vietnamese-Dipping-Sauce-Nuoc-Cham-12.jpg"
});

const example3 = new Recipe({
    id: 2,
    title: "Larb Gai",
    description: "A spicy, herbaceous, and savory Thai and Laotian minced chicken salad. It is known for its bold balance of salty, sour, spicy, and umami flavors",
    image: "https://hot-thai-kitchen.com/wp-content/uploads/2016/06/laab-gai-sq-1.jpg"
});

export const myRecipes = [example1, example2, example3];