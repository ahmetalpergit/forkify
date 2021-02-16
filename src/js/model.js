import {baseURL} from './config';
import { getJSON } from './helpers';

export const state = {
    search: {
        query: '',
        results: []
    },
    recipe: {}
};

export const loadRecipeList = async function(query) {
    try {
        const data = await getJSON(`${baseURL}?search=${query}`);
        const {recipes} = data.data;
        state.search.query = query;
        state.search.results = recipes.map(item => {
            return {
                id: item.id,
                title: item.title,
                publisher: item.publisher,
                imageUrl: item.image_url
            }
        });
    } catch (err) {
        // console.error(err);
        throw err;
    }
};

export const loadRecipe = async function(id) {
    try {
        const data = await getJSON(`${baseURL}${id}`)

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

export const getResultsPage = function(page) {
    const start = (page - 1) * 10;
    const end = page * 10;
    state.search.currentPage = page;
    state.search.totalPage = Math.ceil(state.search.results.length / 10);

    return state.search.results.slice(start, end);
}