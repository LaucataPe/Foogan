require('dotenv').config();
const axios = require("axios")
const { API_KEY_2 } = process.env;
const { Recipe } = require('../db')

const getOneRecipe = async (req, res) =>{
    const {id} = req.params
    const {database} = req.query
    try {
        let data
        if(database){
            data = await Recipe.findByPk(id)
        }else{
            const response = await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY_2}`)
            data = await response.data
        }
        
        console.log(data);
        let recipe = {
            id: data.id,
            title: data.title,
            summary: data.summary,
            healthScore: data.healthScore,
            diets: data.diets,
            steps: data.analyzedInstructions,
            stepsdb: data.steps,
            image: data.image,
        }
        return res.status(200).json(recipe)
    } catch (error) {
        return res.status(404).send(error.message)
    }
}

module.exports = {getOneRecipe}