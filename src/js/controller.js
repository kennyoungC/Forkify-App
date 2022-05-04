import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async () => {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

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
    //1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2) Load search result
    await model.loadSearchResults(query);

    // Render result
  } catch (error) {
    console.log(error);
  }
};
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
