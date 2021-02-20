import View from './View';
import icons from 'url:../../img/icons.svg'; //loading the icons for parcel to convert them later

class addRecipeView extends View {
    _parentContainer = document.querySelector('.overlay');
    _recipeId = 0;

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
    addHandlerUpload(handler) {
        const uploadContainer = document.querySelector('.upload');
        uploadContainer.addEventListener('submit', function(e){
            e.preventDefault();

            handler(this._createUserRecipe(e));
            
        }.bind(this))
    }
    _createUserRecipe(event) {
        const userRecipe = {
            id: `user${this._recipeId}`,
            title: event.target['title'].value,
            publisher: event.target['publisher'].value,
            sourceUrl: event.target['sourceUrl'].value,
            imageUrl: event.target['image'].value,
            servings: Number(event.target['servings'].value),
            user: true,
            cookingTime: Number(event.target['cookingTime'].value),
            ingredients: [
                {
                    quantity: event.target['ingredient-1'].value.split('-')[0],
                    unit: event.target['ingredient-1'].value.split('-')[1],
                    description: event.target['ingredient-1'].value.split('-')[2],
                },
                {
                    quantity: event.target['ingredient-2'].value.split('-')[0],
                    unit: event.target['ingredient-2'].value.split('-')[1],
                    description: event.target['ingredient-2'].value.split('-')[2],
                },
                {
                    quantity: event.target['ingredient-3'].value.split('-')[0],
                    unit: event.target['ingredient-3'].value.split('-')[1],
                    description: event.target['ingredient-3'].value.split('-')[2],
                },
                {
                    quantity: event.target['ingredient-4'].value.split('-')[0],
                    unit: event.target['ingredient-4'].value.split('-')[1],
                    description: event.target['ingredient-4'].value.split('-')[2],
                },
                {
                    quantity: event.target['ingredient-5'].value.split('-')[0],
                    unit: event.target['ingredient-5'].value.split('-')[1],
                    description: event.target['ingredient-5'].value.split('-')[2],
                },
                {
                    quantity: event.target['ingredient-6'].value.split('-')[0],
                    unit: event.target['ingredient-6'].value.split('-')[1],
                    description: event.target['ingredient-6'].value.split('-')[2],
                },
            ].filter(el => el.description !== undefined)
        }
        this._recipeId++;
        return userRecipe;
    }
}

export default new addRecipeView();