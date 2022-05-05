// import { async } from "regenerator-runtime"
import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './helpers';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
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
    console.log(state.search.results);
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
