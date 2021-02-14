import icons from 'url:../../img/icons.svg'; //loading the icons for parcel to convert them later

class ListView {
  #parentContainer = document.querySelector('.results');
  #data;
  #errorMessage = "Can't find recipes for that query, please another."

  render(data) {
    this.#data = data;
    this.#clear();
    this.#data.forEach(el => {
      const recipe = {
        id: el.id,
        title: el.title,
        publisher: el.publisher,
        imageUrl: el.image_url,
      }
      this.#parentContainer.insertAdjacentHTML('afterbegin', this.#generateMarkup(recipe));
    });
    this.#parentContainer.addEventListener('click', function(e) {
      const allElements = document.querySelectorAll('.preview__link');
      allElements.forEach(item => item.classList.remove(`preview__link--active`));
      e.target.closest(`.preview__link`).classList.add(`preview__link--active`);
    })
  }
  renderSpinner() {
    this.#clear();
    const markup =  `
        <div class="spinner">
            <svg>
                <use href="${icons}#icon-loader"></use>
            </svg>
        </div>
    `
    this.#parentContainer.insertAdjacentHTML('afterbegin', markup);
  }
  addHandlerRender(handler) {
    const search = document.querySelector('.search');
    search.addEventListener('submit', function(e) {
      e.preventDefault();
      const query = e.target.querySelector('.search__field').value;
      handler(query);
    })
  }
  errorRender(message = this.#errorMessage) {
    const markup = `
        <div class="error">
            <div>
                <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                </svg>
            </div>
            <p>${message}</p>
        </div>
    `
    this.#clear();
    this.#parentContainer.insertAdjacentHTML('afterbegin', markup);
}
  #clear() {
    this.#parentContainer.innerHTML = '';
  }
  #generateMarkup(recipe) {
    return `
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
  }
};

export default new ListView();