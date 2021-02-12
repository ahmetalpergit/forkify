import 'core-js/stable';
import 'regenerator-runtime';
import * as model from './model';
import recipeView from './views/recipeView';
import listView from './views/listView';
const search = document.querySelector('.search');

///////////////////////////////////////

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

const showRecipeList = async function(query) {
  listView.renderSpinner();
  await model.loadRecipeList(query);
  listView.render(model.state.recipeList)
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

// LISTENERS

//listen for events to load specific recipe
['hashchange', 'load'].forEach(event => window.addEventListener(event, showRecipe));

//submitting a query on search bar
search.addEventListener('submit', function(e) {
  e.preventDefault();
  const query = e.target.querySelector('.search__field').value;
  showRecipeList(query);
})

