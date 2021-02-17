import View from './View';
import icons from 'url:../../img/icons.svg'; //loading the icons for parcel to convert them later
import {Fraction} from 'fractional';

class RecipeView extends View {
    _parentContainer = document.querySelector('.recipe');
    _servingButtons;
    _errorMessage = "Can't find recipe, please try another one!"

    render(data) {
        this._data = data;
        const html = this._generateMarkup();
        this._clear();
        this._parentContainer.insertAdjacentHTML('beforeend', html);
    }
    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(event => window.addEventListener(event, handler));
    }
    addHandlerServing(handler) {
        this._servingButtons = document.querySelector('.recipe__info-buttons')
        this._servingButtons.addEventListener('click', function(e) {
            if (!e.target.closest('.btn--tiny')) return;

            if (e.target.closest('.btn--tiny').classList.contains('btn--increase-servings')) {
                handler(this._data, 'increase');
            } else {
                handler(this._data, 'decrease');
            }
        }.bind(this))
    }
    _generateMarkup() {
        return `
            <figure class="recipe__fig">
            <img src="${this._data.imageUrl}" alt="${this._data.title}" class="recipe__img" />
            <h1 class="recipe__title">
                <span>${this._data.title}</span>
            </h1>
            </figure>
        
            <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                <use href="${icons}#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
                <span class="recipe__info-text">minutes</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                <use href="${icons}#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
                <span class="recipe__info-text">servings</span>
        
                <div class="recipe__info-buttons">
                <button class="btn--tiny btn--decrease-servings${this._data.servings === 1 ? ' hidden' : ''}">
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
            ${this._data.ingredients.map(ing => {
                return `<li class="recipe__ingredient">
                        <svg class="recipe__icon">
                            <use href="${icons}#icon-check"></use>
                        </svg>
                        <div class="recipe__quantity">${ing?.quantity ? new Fraction(ing.quantity).toString() : ''}</div>
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
                <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
                directions at their website.
            </p>
            <a
                class="btn--small recipe__btn"
                href="${this._data.sourceUrl}"
                target="_blank"
            >
                <span>Directions</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </a>
            </div>
        `
    }
};

export default new RecipeView();