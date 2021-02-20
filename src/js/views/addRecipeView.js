import View from './View';
import icons from 'url:../../img/icons.svg'; //loading the icons for parcel to convert them later

class addRecipeView extends View {
    _parentContainer = document.querySelector('.overlay');

    addHandlerAddRecipe(handler) {
        document.querySelector('.nav__btn--add-recipe').addEventListener('click', function() {
            this._parentContainer.classList.remove('hidden');
            handler();
        }.bind(this))
    }

    addHandlerHideOverlay() {
        const closeBtn = document.querySelector('.btn--close-modal');
        [this._parentContainer, closeBtn].forEach(event => event.addEventListener('click', function(e) {
            if (e.target === this._parentContainer || e.target === closeBtn) {
                this._parentContainer.classList.add('hidden');
            }
        }.bind(this)))
    }
}

export default new addRecipeView();