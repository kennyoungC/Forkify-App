import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationview from './views/paginationview.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
const recipeContainer = document.querySelector('.recipe');

// if (module.hot) {
//   module.hot.accept();
// }
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async () => {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    //1) Loading Recipe
    await model.loadRecipe(id);

    // 2) Render Recipe

    recipeView.render(model.state.recipe);
    // const recipeView = new recipeView(model.state.recipe)
  } catch (error) {
    recipeView.renderError();
  }
};
const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner();
    //1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2) Load search result
    await model.loadSearchResults(query);

    // Render result
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons
    paginationview.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};
const controlPagination = function (goto) {
  // 1) Render new result
  resultsView.render(model.getSearchResultsPage(goto));

  // 2) Render new pagination buttons
  paginationview.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationview.addHandlerClick(controlPagination);
};
init();
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
