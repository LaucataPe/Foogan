import {GET_RECIPES, FILTER_ORIGIN, SEARCH_RECIPE, FILTER_DIETS} from "./action_types"

const initialState = {
    recipes: [],
    allRecipes: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        case SEARCH_RECIPE:
            return {
                ...state,
                recipes: action.payload,
            }
        case FILTER_ORIGIN:
            let filter;
            if(action.payload === 'db'){
                filter = state.recipes.filter((recipe) => recipe.database)
            }else if(action.payload === 'api'){
                filter = state.recipes.filter((recipe) => !recipe.database)
            }else{
                filter = state.recipes.filter((recipe) => recipe.title)
            }
            return {
                ...state,
                recipes: filter,
            }
        case FILTER_DIETS:
            const filtDiets = state.recipes.filter(recipe => {
                return recipe.diets.some(diet => diet === action.payload);
              });
            return {
                ...state,
                recipes: filtDiets,
            }
        default:
            return {...state}
    }
}

export default reducer;