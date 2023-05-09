import axios from "axios";
import {GET_RECIPES, FILTER, ORDER} from "./action_types";
const endpoint = 'http://localhost:3001/food';

export const getAllRecipes = () => {
    return async (dispatch) => {
      try {
        const response = await axios(`${endpoint}/recipes`);
        const data = response.data.results;
        console.log(data);
        return dispatch({type: GET_RECIPES, payload: data});
    } catch (error) {
        console.log(error)  
    }
    };
 };

export const filterDiets = (diet) =>{
  return { type: FILTER, payload: diet}
}

export const orderBy = (order) =>{
  return { type: ORDER, payload: order}
}

export const resetCards =() =>{
  return { type: "RESET"}
}
 