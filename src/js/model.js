import {async} from 'regenerator-runtime';

export const state = {
    recipe: {},
    recipeList: {},
};

export const loadRecipeList = async function(query) {
    const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`)
    const data = await res.json();
  
    const {recipes} = data.data;
    state.recipeList = recipes;
};

export const loadRecipe = async function(id) {
    const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(`Bad Request: ${data.message} (Status:${res.status})`);

    const {recipe} = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      imageUrl: recipe.image_url,
      servings: recipe.servings,
      ingredients: recipe.ingredients,
      cookingTime: recipe.cooking_time,
    }
};