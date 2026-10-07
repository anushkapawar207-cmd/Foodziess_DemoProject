// ===============================
// FOODIZIESS RECIPES
// ===============================


// Get recipes from Local Storage
let recipes =
    JSON.parse(localStorage.getItem("recipes")) || [];


// ===============================
// DEFAULT RECIPES
// ===============================

if (recipes.length === 0) {

    recipes = [

        {
            id: 1,
            name: "Paneer Tikka",
            meal: "Dinner",
            taste: "Spicy",
            cuisine: "Indian",
            diet: "Vegetarian",
            image: "images/paneer-tikka.jpg",
            popular: true,

            ingredients:
                "Paneer, Capsicum, Onion, Yogurt, Ginger-Garlic Paste, Red Chilli Powder, Turmeric, Garam Masala, Salt, Lemon Juice",

            instructions:
                "Cut the paneer and vegetables into cubes.\nMarinate them with yogurt and spices.\nLet them rest for 30 minutes.\nPlace the paneer and vegetables on skewers.\nGrill or cook until golden brown.\nServe hot with chutney."
        },


        {
            id: 2,
            name: "Italian Pasta",
            meal: "Lunch",
            taste: "Tangy",
            cuisine: "Italian",
            diet: "Vegetarian",
            image: "images/italian-pasta.jpg",
            popular: true,

            ingredients:
                "Pasta, Tomato Sauce, Onion, Garlic, Olive Oil, Oregano, Chilli Flakes, Salt, Cheese",

            instructions:
                "Boil the pasta until cooked.\nHeat olive oil in a pan.\nAdd onion and garlic and cook until soft.\nAdd tomato sauce and spices.\nAdd the cooked pasta.\nMix well and top with cheese."
        },


        {
            id: 3,
            name: "Chocolate Cake",
            meal: "Snacks",
            taste: "Sweet",
            cuisine: "Italian",
            diet: "Vegetarian",
            image: "images/chocolate-cake.jpg",
            popular: true,

            ingredients:
                "Flour, Cocoa Powder, Sugar, Eggs, Milk, Butter, Baking Powder, Vanilla Essence",

            instructions:
                "Mix flour, cocoa powder and baking powder.\nAdd sugar, eggs, milk and butter.\nMix until smooth.\nPour the batter into a baking pan.\nBake until fully cooked.\nAllow the cake to cool before serving."
        },


        {
            id: 4,
            name: "Masala Dosa",
            meal: "Breakfast",
            taste: "Spicy",
            cuisine: "Indian",
            diet: "Vegetarian",
            image: "images/masala-dosa.jpg",
            popular: true,

            ingredients:
                "Rice, Urad Dal, Potato, Onion, Green Chilli, Mustard Seeds, Curry Leaves, Salt, Oil",

            instructions:
                "Prepare dosa batter using rice and urad dal.\nCook potatoes and prepare the masala filling.\nHeat a dosa pan.\nSpread the batter into a thin circle.\nAdd the potato filling.\nFold the dosa and serve hot."
        },


        {
            id: 5,
            name: "Veg Fried Rice",
            meal: "Lunch",
            taste: "Spicy",
            cuisine: "Chinese",
            diet: "Vegan",
            image: "images/fried-rice.jpg",
            popular: true,

            ingredients:
                "Cooked Rice, Carrot, Beans, Capsicum, Spring Onion, Soy Sauce, Garlic, Pepper, Salt, Oil",

            instructions:
                "Heat oil in a wok.\nAdd garlic and vegetables.\nStir-fry the vegetables on high heat.\nAdd cooked rice.\nAdd soy sauce, pepper and salt.\nMix everything well and serve hot."
        },


        {
            id: 6,
            name: "Mango Smoothie",
            meal: "Breakfast",
            taste: "Sweet",
            cuisine: "Indian",
            diet: "Vegan",
            image: "images/mango-smoothie.jpg",
            popular: true,

            ingredients:
                "Mango, Plant Milk, Sugar, Ice Cubes",

            instructions:
                "Peel and cut the mango.\nAdd mango pieces to a blender.\nAdd plant milk and sugar.\nAdd ice cubes.\nBlend until smooth.\nServe chilled."
        }

    ];


    localStorage.setItem(
        "recipes",
        JSON.stringify(recipes)
    );

}


// ===============================
// MAKE OLD RECIPES COMPATIBLE
// ===============================

recipes.forEach(function(recipe) {

    if (recipe.popular === undefined) {
        recipe.popular = true;
    }

});


// Save updated recipes
localStorage.setItem(
    "recipes",
    JSON.stringify(recipes)
);


// ===============================
// RECIPE CARD
// ===============================

function createRecipeCard(recipe) {

    const card =
        document.createElement("div");

    card.classList.add("recipe-card");


    card.innerHTML = `

        <div class="recipe-image">

            <img
                src="${recipe.image}"
                alt="${recipe.name}"
            >

        </div>


        <div class="recipe-info">

            <h3>
                ${recipe.name}
            </h3>

            <p>
                ${recipe.meal} •
                ${recipe.taste} •
                ${recipe.cuisine}
            </p>

        </div>

    `;


    // ===============================
    // CLICK RECIPE
    // ===============================

    card.addEventListener("click", function() {

        window.location.href =
            `recipe.html?id=${recipe.id}`;

    });


    return card;

}


// ===============================
// DISPLAY POPULAR RECIPES
// ===============================

function displayPopularRecipes() {

    const container =
        document.getElementById("recipe-container");

    if (!container) return;


    container.innerHTML = "";


    const popularRecipes =
        recipes.filter(function(recipe) {

            return recipe.popular === true;

        });


    popularRecipes.forEach(function(recipe) {

        const card =
            createRecipeCard(recipe);

        container.appendChild(card);

    });

}


// ===============================
// SEARCH
// ===============================

const searchInput =
    document.getElementById("search-input");

const searchButton =
    document.getElementById("search-button");


if (searchButton) {

    searchButton.addEventListener(
        "click",
        function() {

            searchRecipes();

        }
    );

}


if (searchInput) {

    searchInput.addEventListener(
        "keypress",
        function(event) {

            if (event.key === "Enter") {

                searchRecipes();

            }

        }
    );

}


function searchRecipes() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const container =
        document.getElementById("recipe-container");

    if (!container) return;


    container.innerHTML = "";


    const filteredRecipes =
        recipes.filter(function(recipe) {

            return recipe.name
                .toLowerCase()
                .includes(searchText);

        });


    filteredRecipes.forEach(function(recipe) {

        container.appendChild(
            createRecipeCard(recipe)
        );

    });

}


// ===============================
// CATEGORY FILTER
// ===============================

function filterRecipes(type, value) {

    const container =
        document.getElementById("recipe-container");

    if (!container) return;


    container.innerHTML = "";


    const filteredRecipes =
        recipes.filter(function(recipe) {

            return recipe[type] === value;

        });


    filteredRecipes.forEach(function(recipe) {

        container.appendChild(
            createRecipeCard(recipe)
        );

    });

}


// ===============================
// CATEGORY FILTER FROM URL
// ===============================

function displayCategoryResults() {

    const container =
        document.getElementById("recipe-container");

    if (!container) return;


    // Read category from URL
    const urlParams =
        new URLSearchParams(window.location.search);


    const meal =
        urlParams.get("meal");

    const taste =
        urlParams.get("taste");

    const cuisine =
        urlParams.get("cuisine");

    const diet =
        urlParams.get("diet");


    // If no category was selected,
    // show popular recipes
    if (!meal && !taste && !cuisine && !diet) {

        displayPopularRecipes();

        return;

    }


    // Filter recipes
    const filteredRecipes =
        recipes.filter(function(recipe) {

            if (meal &&
                recipe.meal.toLowerCase() !==
                meal.toLowerCase()) {

                return false;
            }


            if (taste &&
                recipe.taste.toLowerCase() !==
                taste.toLowerCase()) {

                return false;
            }


            if (cuisine &&
                recipe.cuisine.toLowerCase() !==
                cuisine.toLowerCase()) {

                return false;
            }


            if (diet &&
                recipe.diet.toLowerCase() !==
                diet.toLowerCase()) {

                return false;
            }


            return true;

        });


    container.innerHTML = "";


    // No results
    if (filteredRecipes.length === 0) {

        container.innerHTML = `

            <div class="no-results">

                <h2>
                    No recipes found 😭
                </h2>

                <p>
                    We couldn't find any recipes
                    matching this category.
                </p>

                <a href="index.html">
                    View All Recipes
                </a>

            </div>

        `;

        return;

    }


    // Display filtered recipes
    filteredRecipes.forEach(function(recipe) {

        container.appendChild(
            createRecipeCard(recipe)
        );

    });

}


// ===============================
// INITIAL DISPLAY
// ===============================

displayCategoryResults();