require('dotenv').config();
const axios = require("axios")
const { API_KEY_2 } = process.env;

const getOneRecipe = async (req, res) =>{
    const {id} = req.params
    try {
        const response = await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY_2}`)
        const data = await response.data
        console.log(data);
        let recipe = {
            id: data.id,
            title: data.title,
            summary: data.summary,
            healthScore: data.healthScore,
            diets: data.diets,
            steps: data.analyzedInstructions,
            image: data.image,
        }
        return res.status(200).json(recipe)
    } catch (error) {
        return res.status(404).send(error.message)
    }
}

module.exports = {getOneRecipe}