require('dotenv').config();
const axios = require("axios")
const { API_KEY_2, API_KEY } = process.env;
const { Recipe } = require('../db')
const URL = `https://api.spoonacular.com/recipes/complexSearch?number=2&addRecipeInformation=true&apiKey=${API_KEY}`

const getAllRecipes = async (req, res) =>{
    try {
        const response = await axios(URL)
        const data = await response.data.results
        const getRecipes = await Recipe.findAll()
        const allRecipes = data.concat(getRecipes)

        if(Object.keys(req.query).length > 0){
            const filter = allRecipes.filter((recipe) => recipe.title.toLowerCase().includes(req.query.name.toLowerCase()))
            return res.status(200).json(filter)
        }else{
            return res.status(200).json(allRecipes)
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {getAllRecipes}