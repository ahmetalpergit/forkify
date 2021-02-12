import icons from 'url:../img/icons.svg'; //loading the icons for parcel to convert them later
import 'core-js/stable';
import 'regenerator-runtime';

const recipeContainer = document.querySelector('.recipe');
const search = document.querySelector('.search');
const listContainer = document.querySelector('.results');

///////////////////////////////////////

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2
const API_KEY = 'be61e14a-e6f0-434d-a5f2-d8bc0fcba41f';

const showRecipeList = async function(query) {
  const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}&key=${API_KEY}`)
  const data = await res.json();

  const recipeList = data.data.recipes;
  renderRecipeList(recipeList)
}

const renderRecipeList = function(listArray) {
  listContainer.innerHTML = '';

  listArray.forEach(el => {
    const recipe = {
      id: el.id,
      title: el.title,
      publisher: el.publisher,
      imageUrl: el.image_url,
    }
    const html = `
                <li class="preview">
                  <a class="preview__link" href="#${recipe.id}">
                    <figure class="preview__fig">
                      <img src="${recipe.imageUrl}" alt="${recipe.title}" />
                    </figure>
                    <div class="preview__data">
                      <h4 class="preview__title">${recipe.title}</h4>
                      <p class="preview__publisher">${recipe.publisher}</p>
                      ${recipe?.user ? `<div class="preview__user-generated">
                                        <svg>
                                          <use href="${icons}#icon-user"></use>
                                        </svg>
                                      </div>
                    ` : ''}
                    </div>
                  </a>
                </li>
    `
    listContainer.insertAdjacentHTML('afterbegin', html);
  })
}

const showRecipe = async function () {
  //the id is assigned after the hashchange/load eventlistener.
  const id = window.location.hash.slice(1);
  if (id === '') return; //stop load event from crashing the app due to empty id
  try {
    //spinner while waiting for the recipe
    renderSpinner(recipeContainer);

    const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=${API_KEY}`);
    const data = await res.json();
    if (!res.ok) throw new Error(`Bad Request: ${data.message} (Status:${res.status})`);

    let {recipe} = data.data;

    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      imageUrl: recipe.image_url,
      servings: recipe.servings,
      ingredients: recipe.ingredients,
      cookingTime: recipe.cooking_time,
    }
    renderRecipe(recipe, recipeContainer)

  } catch (err) {
    console.error(err.message);
  }
}

//RENDER SPINNER
const renderSpinner = function(parent) {
  parent.innerHTML = '';

  const markup =  `
                    <div class="spinner">
                      <svg>
                        <use href="${icons}#icon-loader"></use>
                      </svg>
                    </div>
  `
  parent.insertAdjacentHTML('afterbegin', markup);
}

//RENDER RECIPE

const renderRecipe = function(recipe, element) {
  element.innerHTML = '';

  const html = `
    <figure class="recipe__fig">
      <img src="${recipe.imageUrl}" alt="Tomato" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${recipe.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

      <div class="recipe__user-generated">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round">
        <svg class="">
          <use href="${icons}#icon-bookmark-fill"></use>
        </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
      ${recipe.ingredients.map(ing => {
        return `<li class="recipe__ingredient">
                  <svg class="recipe__icon">
                    <use href="${icons}#icon-check"></use>
                  </svg>
                  <div class="recipe__quantity">${ing?.quantity}</div>
                  <div class="recipe__description">
                    <span class="recipe__unit">${ing?.unit}</span>
                    ${ing?.description}
                  </div>
                </li>`
      }).join('')}
      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${recipe.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
  `
  element.insertAdjacentHTML('beforeend', html);
};

//LISTENERS

//listen for events to load specific recipe
['hashchange', 'load'].forEach(event => window.addEventListener(event, showRecipe));

//submitting a query on search bar
search.addEventListener('submit', function(e) {
  e.preventDefault();
  const query = e.target.querySelector('.search__field').value;
  showRecipeList(query);
})

