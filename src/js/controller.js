import 'core-js/stable';
import 'regenerator-runtime';
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import pageView from './views/pageView';
import bookmarkListView from './views/bookmarkListView';

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
    //listen for serving
    recipeView.addHandlerServing(controlServing);
    recipeView.addHandlerBookmark(controlBookmark);
  } catch (err) {
    console.error(err.message);
    recipeView.errorRender();
  }
};

const controlPagination = function(page) {
  searchView.render(model.getResultsPage(page))
  pageView.render(model.state.search.currentPage, model.state.search.totalPage);
}

const controlServing = function(action) {
  model.updateServings(action);
  recipeView.update(model.state.recipe);
}

const controlBookmark = function(recipe) {
  model.addBookmark(JSON.stringify(recipe));
  bookmarkListView.render(model.state.bookmarks);
}

const init = function() {
  //listen for events to load specific recipe
  recipeView.addHandlerRender(showRecipe);
  //listen for search bar submit
  searchView.addHandlerRender(showSearchResults);
  //listen for pagination
  pageView.addHandlerPagination(controlPagination);
}
init();


