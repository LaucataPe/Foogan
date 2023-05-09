import axios from "axios";
import {GET_RECIPES} from "./action_types";
//const endpoint = 'http://localhost:3001/food';

export const getAllRecipes = () => {
    return async (dispatch) => {
      try {
        const response = await axios('https://jsonplaceholder.typicode.com/posts');
        const data = response.data;
        console.log(data);
        return dispatch({type: GET_RECIPES, payload: data});
    } catch (error) {
        console.log(error)  
    }
    };
 };

 