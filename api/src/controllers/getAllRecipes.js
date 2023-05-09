require('dotenv').config();
const axios = require("axios")
const { API_KEY } = process.env;
const URL = `https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeNutrition=true&apiKey=${API_KEY}`

const getAllRecipes = async (req, res) =>{
    try {
        const response = await axios(URL)
        const data = await response.data
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {getAllRecipes}