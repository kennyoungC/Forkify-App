import View from './view';
import icons from 'url:../../img/icons.svg'; // parcel 2

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      // console.log(btn);
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      // console.log(goToPage);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButtonsNext(curPage);
    }
    // Last pages
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButtonsPrev(curPage);
    }
    // Other pages
    if (curPage < numPages) {
      return `${this._generateMarkupButtonsPrev(
        curPage
      )}${this._generateMarkupButtonsNext(curPage)}`;
    }
    // Page 1, and there are no  other pages
    return '';
  }
  _generateMarkupButtonsNext(cur) {
    return `
          <button data-goto=${
            cur + 1
          } class="btn--inline pagination__btn--next">
          <span>Page ${cur + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
  }
  _generateMarkupButtonsPrev(cur) {
    return `
        <button data-goto=${cur - 1} class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
          </svg>
        <span>Page ${cur - 1}</span>
        </button>`;
  }
}

export default new paginationView();
