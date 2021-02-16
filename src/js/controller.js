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
    model.state.search.results?.length > 0 ? searchView.render(model.getResultsPage(1)) : searchView.errorRender();
    pageView._clear();
    pageView.render(model.state.search.currentPage, model.state.search.totalPage);
    
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

  } catch (err) {
    // console.error(err.message);
    recipeView.errorRender();
  }
};

const controlPagination = function(page) {
  searchView.render(model.getResultsPage(page))
  model.state.currentPage++;
  pageView.render(model.state.search.currentPage, model.state.search.totalPage);
}

const init = function() {
  //listen for events to load specific recipe
  recipeView.addHandlerRender(showRecipe);
  //listen for search bar submit
  searchView.addHandlerRender(showSearchResults);
  //list for pagination clicks
  pageView.addHandlerPagination(controlPagination);
}
init();


