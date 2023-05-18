require('dotenv').config();
const axios = require("axios")
const { API_KEY_2, API_KEY } = process.env;
const { Diet } = require('../db')
const URL = `https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${API_KEY}`

const getAllDiets = async (req, res) =>{
    try {
        const response = await axios(URL)
        const data = await response.data.results
        
        const allDiets = [];
        data.forEach(recipe => recipe.diets.forEach((diet) => allDiets.push(diet)));

        const diets = allDiets.filter((element, index, self) => self.indexOf(element) === index);

        const dbDiets = await Diet.findAll()
        if (dbDiets.length === 0) {
            diets.forEach(async (diet) => await Diet.create({name: diet}))
        }
        
        res.status(200).json(diets)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {getAllDiets}