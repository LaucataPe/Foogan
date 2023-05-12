require('dotenv').config();
const axios = require("axios")
const { API_KEY_2, API_KEY } = process.env;
const { Recipe, Diet } = require('../db')

const getOneRecipe = async (req, res) =>{
    const {id} = req.params
    const {database} = req.query
    try {
        let data
        if (database) {
            const recipe = await Recipe.findByPk(id, { include: Diet }); // Obtener receta con sus relaciones de dieta
            console.log(recipe);
            const dietas = recipe.Diets.map(diet => diet.name); // Obtener solo los nombres de las dietas
            data = { ...recipe.toJSON(), diets: dietas }; // Incluir los nombres de las dietas en la respuesta
          } else {
            const response = await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
            data = response.data;
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