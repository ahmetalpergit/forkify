import {async} from 'regenerator-runtime';
import {baseURL} from './config';
import { getJSON } from './helpers';

export const state = {
    recipe: {},
    recipeList: {},
};

export const loadRecipeList = async function(query) {
    try {
        const data = await getJSON(`${baseURL}?search=${query}`);
        const {recipes} = data.data;
        state.recipeList = recipes;
    } catch (err) {
        // console.error(err);
        throw err;
    }
};

export const loadRecipe = async function(id) {
    try {
        const data = await getJSON(`${baseURL}/${id}`)

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
    }
    catch (err) {
        console.error(err);
        throw err;
    }
};