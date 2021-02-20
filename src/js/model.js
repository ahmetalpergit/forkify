import { baseURL, PAGINATION_PAGE_COUNT } from './config';
import { getJSON } from './helpers';

export const state = {
    search: {
        query: '',
        results: []
    },
    recipe: {},
    bookmarks: []
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

        state.recipe.isBookmarked = state.bookmarks.some(el => el.id === state.recipe.id);
    }
    catch (err) {
        console.error(err);
        throw err;
    }
};

export const updateServings = function(action) {
    if (action !== 'increase' && action !== 'decrease') return;
    action === 'increase' ? state.newServings = (state.recipe.servings + 1) : state.newServings = (state.recipe.servings - 1);
    state.recipe.ingredients.forEach(ing => {
        if (ing.quantity) ing.quantity = ing.quantity / state.recipe.servings * state.newServings
    })
    state.recipe.servings = state.newServings;
}

export const getResultsPage = function(page) {
    const start = (page - 1) * PAGINATION_PAGE_COUNT;
    const end = page * PAGINATION_PAGE_COUNT;
    state.search.currentPage = page;
    state.search.totalPage = Math.ceil(state.search.results.length / PAGINATION_PAGE_COUNT);
    return state.search.results.slice(start, end);
}

export const addBookmark = function(recipe) {
    let index;  //index of the element if found by some method
    const hasRecipe = state.bookmarks.some((rec, i) => {
        index = i;  //updates index until it finds one and then breaks the execution
        return rec.id === recipe.id
    });

    if (hasRecipe) {
        state.bookmarks.splice(index, 1);
        state.recipe.isBookmarked = false;
        setLocalStorage();
    } else {
        state.recipe.isBookmarked = true;
        state.bookmarks.push(recipe)
        setLocalStorage();
    }
}

export const loadLocalStorageBookmarks = function() {
    if (localStorage.length === 0) return;
    const localBookmarks = JSON.parse(localStorage.bookmarks);
    state.bookmarks = localBookmarks;
}

const setLocalStorage = function() {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}