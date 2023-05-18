require('dotenv').config();
const axios = require("axios")
const { API_KEY_2, API_KEY } = process.env;
const { Recipe, Diet } = require('../db')
const URL = `https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${API_KEY}`

const getAllRecipes = async (req, res) =>{
    try {
        //const response = await axios(URL)
        //const data = await response.data.results
        const getRecipes = await Recipe.findAll({ include: Diet })
        const recipeDiets = await getRecipes.map(recipe => {
            const diets = recipe.Diets.map(diet => diet.name); // Obtain only the diet's name
            return { ...recipe.toJSON(), diets: diets }; // Include names in te answer
        });
        //const allRecipes = data.concat(recipeDiets)

        /*if(Object.keys(req.query).length > 0){
            const filter = allRecipes.filter((recipe) => recipe.title.toLowerCase().includes(req.query.name.toLowerCase()))
            console.log(filter);
            return res.status(200).json(filter)
        }else{
            return res.status(200).json(allRecipes)
        }*/
        return res.status(200).json(recipeDiets)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {getAllRecipes}