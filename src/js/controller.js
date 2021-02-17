import 'core-js/stable';
import 'regenerator-runtime';
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import pageView from './views/pageView';

///////////////////////////////////////

const showSearchResults = async function(query) {
  try {
    searchView.renderSpinner();
    await model.loadRecipeList(query);

    if (model.state.search.results?.length > 0) {
      searchView.render(model.getResultsPage(1))
      pageView._clear();
      pageView.render(model.state.search.currentPage, model.state.search.totalPage);
    } else {
      pageView._clear();
      searchView.errorRender();
    }
    
  } catch (err) {
    console.error(err.message);
  }
};

const showRecipe = async function () {
  //the id is assigned after the hashchange/load eventlistener.
  const id = window.location.hash.slice(1);
  if (id === '' || !id) return; //stop load event from crashing the app due to empty id on initial load trigger

  try {
    //spinner while waiting for the recipe
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe)
    recipeView.addHandlerServing(controlServing);
  } catch (err) {
    console.error(err.message);
    recipeView.errorRender();
  }
};

const controlPagination = function(page) {
  searchView.render(model.getResultsPage(page))
  model.state.currentPage++;
  pageView.render(model.state.search.currentPage, model.state.search.totalPage);
}

const controlServing = function(data, action) {
  let currentServing = data.servings;
  
  if (action === 'increase') {
    const newIngredientsWithUpdatedQuantities = data.ingredients.map(ing => {
      if (ing.quantity) {
        ing.quantity = (ing.quantity / currentServing) * (currentServing + 1);
      }
      return ing;
    })
    model.state.recipe.ingredients = newIngredientsWithUpdatedQuantities;
    model.state.recipe.servings = ++currentServing;
  } else {
    const newIngredientsWithUpdatedQuantities = data.ingredients.map(ing => {
      if (ing.quantity) {
        ing.quantity = (ing.quantity / currentServing) * (currentServing - 1);
      }
      return ing;
    })
    model.state.recipe.ingredients = newIngredientsWithUpdatedQuantities;
    model.state.recipe.servings = --currentServing;
  }
  recipeView.render(model.state.recipe);
  recipeView.addHandlerServing(controlServing);
}

const init = function() {
  //listen for events to load specific recipe
  recipeView.addHandlerRender(showRecipe);
  //listen for search bar submit
  searchView.addHandlerRender(showSearchResults);
  //listen for pagination
  pageView.addHandlerPagination(controlPagination);
  //listen for serving
}
init();


