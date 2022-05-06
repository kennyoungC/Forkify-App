import View from './view';
import icons from 'url:../../img/icons.svg'; // parcel 2
import previewView from './previewView';
class bookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = `No bookmark added, look for a nice recipe and add to bookmark :)`;
  _message = '';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join(' ');
  }
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);
    return `
    <li class="preview">
      <a class="preview__link ${
        result.id === id ? 'preview__link--active' : ''
      }" href="#${result.id}">
        <figure class="preview__fig">
          <img src="${result.image}" alt="${result.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${result.title}</h4>
          <p class="preview__publisher">${result.publisher}</p>
        </div>
      </a>
  </li>
    `;
  }
}
export default new bookmarkView();
{
  /* <div class="preview__user-generated">
<svg>
  <use href="${icons}#icon-user"></use>
</svg>
</div> */
}
