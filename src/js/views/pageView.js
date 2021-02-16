import View from './View';
import icons from 'url:../../img/icons.svg'; //loading the icons for parcel to convert them later

class pageView extends View {
    _parentContainer = document.querySelector('.pagination');
    _errorMessage = "Can't load recipe."
    _currentPage;
    _totalPage;
    
    render(currentPage, totalPage) {
        this._currentPage = currentPage;
        this._totalPage = totalPage;
        
        this._parentContainer.insertAdjacentHTML('beforeend', this._renderPagination(currentPage));
    }

    _renderPagination(page) {
        const markup = page === 1 ? `
        <button class="btn--inline pagination__btn--next">
          <span>Page 2</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
        ` : `<button class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${page - 1}</span>
            </button>
            <button class="btn--inline pagination__btn--next">
              <span>Page ${page + 1}</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </button>
            `
        return markup;
    }

    addHandlerPagination() {
        this._parentContainer.addEventListener('click', function(e) {
          console.log(e.target);
        })
    }
}

export default new pageView();