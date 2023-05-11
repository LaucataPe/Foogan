import axios from "axios";
import {GET_RECIPES, FILTER_ORIGIN, FILTER_DIETS, ORDER, SEARCH_RECIPE} from "./action_types";
const endpoint = 'http://localhost:3001/food';

export const getAllRecipes = () => {
    return async (dispatch) => {
      try {
        const response = await axios(`${endpoint}/recipes`);
        const data = response.data;
        return dispatch({type: GET_RECIPES, payload: data});
    } catch (error) {
        console.log(error)  
    }
    };
 };

export const searchRecipe = (query) => {
  return async (dispatch) => {
    try {
      const response = await axios(`${endpoint}/recipes?name=${query}`);
      const data = response.data;
      return dispatch({type: SEARCH_RECIPE, payload: data});
  } catch (error) {
      console.log(error)  
  }
  };
};

export const filterOrigin = (origin) =>{
  return { type: FILTER_ORIGIN, payload: origin}
}

export const filterDiets = (diet) =>{
  return { type: FILTER_DIETS, payload: diet}
}

export const orderBy = (order, type) =>{
  return { type: ORDER, payload: [order, type]}
}

export const resetCards =() =>{
  return { type: "RESET"}
}
 