// import { async } from "regenerator-runtime"
import { API_URL } from './config';
import { getJSON } from './helpers';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
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
