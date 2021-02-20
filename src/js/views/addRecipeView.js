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
    addHandlerUpload() {
        const uploadContainer = document.querySelector('.upload');
        uploadContainer.addEventListener('submit', function(e){
            e.preventDefault();

            const userRecipe = {
                title: e.target['title'].value,
                publisher: e.target['publisher'].value,
                sourceUrl: e.target['sourceUrl'].value,
                imageUrl: e.target['image'].value,
                servings: Number(e.target['servings'].value),
                cookingTime: Number(e.target['cookingTime'].value),
                ingredients: [
                    {
                        quantity: e.target['ingredient-1'].value.split('-')[0],
                        unit: e.target['ingredient-1'].value.split('-')[1],
                        description: e.target['ingredient-1'].value.split('-')[2],
                    },
                    {
                        quantity: e.target['ingredient-2'].value.split('-')[0],
                        unit: e.target['ingredient-2'].value.split('-')[1],
                        description: e.target['ingredient-2'].value.split('-')[2],
                    },
                    {
                        quantity: e.target['ingredient-3'].value.split('-')[0],
                        unit: e.target['ingredient-3'].value.split('-')[1],
                        description: e.target['ingredient-3'].value.split('-')[2],
                    },
                    {
                        quantity: e.target['ingredient-4'].value.split('-')[0],
                        unit: e.target['ingredient-4'].value.split('-')[1],
                        description: e.target['ingredient-4'].value.split('-')[2],
                    },
                    {
                        quantity: e.target['ingredient-5'].value.split('-')[0],
                        unit: e.target['ingredient-5'].value.split('-')[1],
                        description: e.target['ingredient-5'].value.split('-')[2],
                    },
                    {
                        quantity: e.target['ingredient-6'].value.split('-')[0],
                        unit: e.target['ingredient-6'].value.split('-')[1],
                        description: e.target['ingredient-6'].value.split('-')[2],
                    },
                ].filter(el => el.description !== undefined)
            }
            console.log(userRecipe);
        })
    }
}

export default new addRecipeView();