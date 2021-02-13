import 'core-js/stable';
import 'regenerator-runtime';
import * as model from './model';
import recipeView from './views/recipeView';
import listView from './views/listView';

///////////////////////////////////////

const showRecipeList = async function(query) {
  try {
    listView.renderSpinner();
    await model.loadRecipeList(query);
    listView.render(model.state.recipeList)
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
    console.error(err.message);
  }
};

const init = function() {
  //listen for events to load specific recipe
  recipeView.addHandlerRender(showRecipe);
  //submitting a query on search bar
  listView.addHandlerRender(showRecipeList);
}
init();


