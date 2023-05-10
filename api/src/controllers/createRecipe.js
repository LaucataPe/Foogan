const { Recipe } = require('../db')

const createRecipe = async (req, res) =>{
    console.log(req.body);
    try {
        const { title, image, summary, healthScore, steps, diets } = req.body
        console.log(req.body);
        const newRecipe = await Recipe.create({
            title, image, summary, healthScore, steps, diets
        })
        await newRecipe.addDiets(diets);
        res.status(200).json(newRecipe)
    } catch (error) {
        res.status(404).send(error.message)
    }
}

module.exports = {createRecipe}

