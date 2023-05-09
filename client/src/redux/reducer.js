import {GET_RECIPES, FILTER, ORDER} from "./action_types"

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
            }
        case ORDER:
            const {by, js} = action.payload
            const orderRecipes = [...state.recipes]
            return {
                ...state,

            }
        default:
            return {...state}
    }
}

export default reducer;