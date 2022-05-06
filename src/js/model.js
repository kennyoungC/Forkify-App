// import { async } from "regenerator-runtime"
import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config';
import { getJSON, sendJSON } from './helpers';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};
export const loadRecipe = async id => {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    // const res = await fetch(`${API_URL}/${id}`);
    // const data = await res.json();
    // if (!res.ok) throw new Error(`${data.status} (${res.status})`);
    const { recipe } = data.data;
    state.recipe = {
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      title: recipe.title,
      image: recipe.image_url,
      publisher: recipe.publisher,
      id: recipe.id,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
    };

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
    // console.log(state.recipe);
  } catch (error) {
    throw error;
  }
};
export const loadSearchResults = async query => {
  try {
    const data = await getJSON(`${API_URL}?search= ${query}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    state.search.page = 1;
    // console.log(state.search.results);
  } catch (error) {
    throw error;
  }
};
export const getSearchResultsPage = function (page = 1) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};
export const updateServings = newServings => {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // newQt = oldQt * newServings / oldSERVINGS
  });
  state.recipe.servings = newServings;
};
const persistBookmark = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};
export const addBookmark = recipe => {
  // Add Bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmark();
};
const clearBookmarks = () => {
  localStorage.clear('bookmarks');
};
export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  // Mark current recipe as Not bookmark
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmark();
};
const init = () => {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();
export const uploadRecipe = async newRecipe => {
  try {
    const ingredientsArr = Object.entries(newRecipe).filter(
      entry => entry[0].startsWith('ingredient') && entry[1] !== ''
    );
    console.log(ingredientsArr);
    const ingredientsObj = ingredientsArr.map(ing => {
      const ingArr = ing[1].replaceAll(' ', '').split(',');

      if (ingArr.length !== 3) {
        throw new Error(
          'Wrong ingredient format! Please use the correct format'
        );
      }

      const [quantity, unit, description] = ingArr;
      return { quantity: quantity ? +quantity : null, unit, description };
    });

    console.log(ingredientsObj);
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients: ingredientsObj,
    };
    const data = await sendJSON(`${API_URL}`, recipe);
    console.log(data);
  } catch (error) {
    throw error;
    // 4fd8e57b-fa2b-4fed-9a81-fc960b5ecb1e
  }
};

// clearBookmarks()
