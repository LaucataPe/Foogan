import {GET_RECIPES,GET_DIETS, FILTER_ORIGIN, SEARCH_RECIPE, FILTER_DIETS, ORDER, RESET} from "./action_types"

const initialState = {
    recipes: [],
    filteredRecipes: [] ,// Nuevo estado para almacenar los resultados filtrados
    allRecipes: [],
    diets: []
  };

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload,
                filteredRecipes: []
            }
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload,
            }
        case SEARCH_RECIPE:
            return {
                ...state,
                recipes: action.payload,
                filteredRecipes: action.payload
            }
        case FILTER_ORIGIN:
            let filter;
            let theFilter;
            const allRecipesCopy = [...state.allRecipes];

            if(state.filteredRecipes.length === 0) theFilter = allRecipesCopy
            if(state.filteredRecipes.length > 0) theFilter = state.filteredRecipes

            if (action.payload === "db") {
                filter = theFilter.filter((recipe) => recipe.database);
            } else if (action.payload === "api") {
                filter = theFilter.filter((recipe) => !recipe.database);
            } else {
                if(state.filteredRecipes.length === 0) filter = state.allRecipes;
                if(state.filteredRecipes.length > 0) filter = state.filteredRecipes;
            }
            return {
                ...state,
                recipes: filter
            };

        case FILTER_DIETS:
            let filteredRecipes;
            if (action.payload === 'all' && state.filteredRecipes.length === 0) {
                filteredRecipes = state.allRecipes;
            }else if(action.payload === 'all' && state.filteredRecipes.length > 0){
                filteredRecipes = state.filteredRecipes;
            }         
            else if(state.filteredRecipes.length > 0){
                filteredRecipes = state.filteredRecipes.filter((recipe) => {
                return recipe.diets.some((diet) => diet === action.payload);
            })}else{
                const allRecipesDiets = [...state.allRecipes];
                filteredRecipes = allRecipesDiets.filter((recipe) => {
                    return recipe.diets.some((diet) => diet === action.payload);
                })
            }
                return {
                  ...state,
                  recipes: filteredRecipes,
                };
        case ORDER:
            const recipesCopy = [...state.recipes];
            if (action.payload[1] === "A") {
            recipesCopy.sort((a, b) => {
                if (a[action.payload[0]] === b[action.payload[0]]) return 0;
                if (a[action.payload[0]] < b[action.payload[0]]) return -1;
                return 1;
            });
            }
            if (action.payload[1] === "D") {
            recipesCopy.sort((a, b) => {
                if (a[action.payload[0]] === b[action.payload[0]]) return 0;
                if (a[action.payload[0]] > b[action.payload[0]]) return -1;
                return 1;
            });
            }
            return {
            ...state,
            recipes: recipesCopy,
            };

            case RESET:
            return {
                ...state,
                recipes: state.allRecipes,
                filteredRecipes: []
            };
        default:
            return state
    }
}

export default reducer;