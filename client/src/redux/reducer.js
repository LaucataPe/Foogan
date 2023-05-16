import {GET_RECIPES,GET_DIETS, FILTER_ORIGIN, SEARCH_RECIPE, FILTER_DIETS, ORDER, RESET} from "./action_types"

const initialState = {
    recipes: [],
    allRecipes: [],
    diets: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
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
            }
        case FILTER_ORIGIN:
            let filter;
            if (action.payload === "db") {
                filter = state.allRecipes.filter((recipe) => recipe.database);
            } else if (action.payload === "api") {
                filter = state.allRecipes.filter((recipe) => !recipe.database);
            } else {
                filter = state.allRecipes;
            }
            return {
                ...state,
                recipes: filter
            };
        case FILTER_DIETS:
            let filteredRecipes;
            if (action.payload === 'all') {
                filteredRecipes = state.allRecipes;
            }else{
                filteredRecipes = state.allRecipes.filter((recipe) => {
                    return recipe.diets.some((diet) => diet === action.payload);
                  });
            }
              return {
                ...state,
                recipes: filteredRecipes
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
            };
        default:
            return state
    }
}

export default reducer;