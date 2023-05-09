const { Recipe } = require('../db')

const createRecipe = async (req, res) =>{
    try {
        const { title, image, summary, healthScore, steps } = req.body
        console.log(req.body);
        const newRecipe = await Recipe.create({
            title, image, summary, healthScore, steps
        })
        res.status(200).json(newRecipe)
    } catch (error) {
        res.status(404).send(error.message)
    }
}

module.exports = {createRecipe}

