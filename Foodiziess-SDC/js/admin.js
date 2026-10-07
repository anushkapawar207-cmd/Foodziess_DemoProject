// ===============================
// ADMIN RECIPE MANAGEMENT
// ===============================


const recipeForm =
    document.getElementById("recipe-form");


const adminRecipeContainer =
    document.getElementById("admin-recipe-container");


const editRecipeCard =
    document.getElementById("edit-recipe-card");


const editRecipeForm =
    document.getElementById("edit-recipe-form");


const cancelEdit =
    document.getElementById("cancel-edit");


// ===============================
// LOAD RECIPES
// ===============================

let adminRecipes =
    JSON.parse(localStorage.getItem("recipes")) || [];


let editingRecipeId = null;


// ===============================
// DISPLAY RECIPES
// ===============================

function displayAdminRecipes() {

    adminRecipeContainer.innerHTML = "";


    adminRecipes.forEach(function(recipe) {

        const recipeCard =
            document.createElement("div");


        recipeCard.classList.add("recipe-card");


        recipeCard.innerHTML = `

            <div class="admin-recipe-image">

                <img
                    src="../${recipe.image}"
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
                    ${recipe.cuisine} •
                    ${recipe.diet}
                </p>


                <p>

                    <strong>
                        Popular:
                    </strong>

                    ${recipe.popular ? "Yes" : "No"}

                </p>


                <button
                    onclick="editRecipe(${recipe.id})"
                >
                    Edit
                </button>


                <button
                    onclick="deleteRecipe(${recipe.id})"
                >
                    Delete
                </button>

            </div>

        `;


        adminRecipeContainer.appendChild(
            recipeCard
        );

    });

}


// ===============================
// ADD RECIPE
// ===============================

if (recipeForm) {

    recipeForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const newRecipe = {

                id: Date.now(),


                name:
                    document.getElementById(
                        "recipe-name"
                    ).value,


                meal:
                    document.getElementById(
                        "recipe-meal"
                    ).value,


                taste:
                    document.getElementById(
                        "recipe-taste"
                    ).value,


                cuisine:
                    document.getElementById(
                        "recipe-cuisine"
                    ).value,


                diet:
                    document.getElementById(
                        "recipe-diet"
                    ).value,


                image:
                    document.getElementById(
                        "recipe-image"
                    ).value,


                // NEW: Ingredients
                ingredients:
                    document.getElementById(
                        "recipe-ingredients"
                    ).value,


                // NEW: Instructions
                instructions:
                    document.getElementById(
                        "recipe-instructions"
                    ).value,


                // Popular checkbox
                popular:
                    document.getElementById(
                        "recipe-popular"
                    ).checked

            };


            // Add recipe to array

            adminRecipes.push(
                newRecipe
            );


            // Save to Local Storage

            localStorage.setItem(
                "recipes",
                JSON.stringify(adminRecipes)
            );


            // Clear form

            recipeForm.reset();


            // Refresh recipe list

            displayAdminRecipes();


            alert(
                "Recipe added successfully!"
            );

        }
    );

}


// ===============================
// EDIT RECIPE
// ===============================

function editRecipe(id) {


    const recipe =
        adminRecipes.find(
            function(recipe) {

                return recipe.id === id;

            }
        );


    if (!recipe) return;


    editingRecipeId = id;


    // Recipe name

    document.getElementById(
        "edit-recipe-name"
    ).value = recipe.name;


    // Meal

    document.getElementById(
        "edit-recipe-meal"
    ).value = recipe.meal;


    // Taste

    document.getElementById(
        "edit-recipe-taste"
    ).value = recipe.taste;


    // Cuisine

    document.getElementById(
        "edit-recipe-cuisine"
    ).value = recipe.cuisine;


    // Diet

    document.getElementById(
        "edit-recipe-diet"
    ).value = recipe.diet;


    // Image

    document.getElementById(
        "edit-recipe-image"
    ).value = recipe.image;


    // Ingredients

    document.getElementById(
        "edit-recipe-ingredients"
    ).value =
        recipe.ingredients || "";


    // Instructions

    document.getElementById(
        "edit-recipe-instructions"
    ).value =
        recipe.instructions || "";


    // Popular

    document.getElementById(
        "edit-recipe-popular"
    ).checked =
        recipe.popular || false;


    // Show edit form

    editRecipeCard.style.display =
        "block";


    // Scroll to edit form

    editRecipeCard.scrollIntoView({
        behavior: "smooth"
    });

}


// ===============================
// UPDATE RECIPE
// ===============================

if (editRecipeForm) {

    editRecipeForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const recipe =
                adminRecipes.find(
                    function(recipe) {

                        return recipe.id ===
                            editingRecipeId;

                    }
                );


            if (!recipe) return;


            // Update name

            recipe.name =
                document.getElementById(
                    "edit-recipe-name"
                ).value;


            // Update meal

            recipe.meal =
                document.getElementById(
                    "edit-recipe-meal"
                ).value;


            // Update taste

            recipe.taste =
                document.getElementById(
                    "edit-recipe-taste"
                ).value;


            // Update cuisine

            recipe.cuisine =
                document.getElementById(
                    "edit-recipe-cuisine"
                ).value;


            // Update diet

            recipe.diet =
                document.getElementById(
                    "edit-recipe-diet"
                ).value;


            // Update image

            recipe.image =
                document.getElementById(
                    "edit-recipe-image"
                ).value;


            // Update ingredients

            recipe.ingredients =
                document.getElementById(
                    "edit-recipe-ingredients"
                ).value;


            // Update instructions

            recipe.instructions =
                document.getElementById(
                    "edit-recipe-instructions"
                ).value;


            // Update popularity

            recipe.popular =
                document.getElementById(
                    "edit-recipe-popular"
                ).checked;


            // Save updated recipe

            localStorage.setItem(
                "recipes",
                JSON.stringify(adminRecipes)
            );


            // Refresh recipe list

            displayAdminRecipes();


            // Hide edit form

            editRecipeCard.style.display =
                "none";


            editingRecipeId = null;


            alert(
                "Recipe updated successfully!"
            );

        }
    );

}


// ===============================
// CANCEL EDIT
// ===============================

if (cancelEdit) {

    cancelEdit.addEventListener(
        "click",
        function() {

            editRecipeCard.style.display =
                "none";


            editingRecipeId = null;

        }
    );

}


// ===============================
// DELETE RECIPE
// ===============================

function deleteRecipe(id) {


    const confirmDelete =
        confirm(
            "Are you sure you want to delete this recipe?"
        );


    if (!confirmDelete) return;


    adminRecipes =
        adminRecipes.filter(
            function(recipe) {

                return recipe.id !== id;

            }
        );


    // Save after deletion

    localStorage.setItem(
        "recipes",
        JSON.stringify(adminRecipes)
    );


    // Refresh recipes

    displayAdminRecipes();


    alert(
        "Recipe deleted successfully!"
    );

}


// ===============================
// INITIAL DISPLAY
// ===============================

displayAdminRecipes();