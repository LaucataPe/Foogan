const { Recipe } = require('../db')

const updateRecipe = async (req, res) =>{
    const {id} = req.params
    try {
        const { title, image, summary, healthScore, steps, diets } = req.body
        const getDiets = await Recipe.update({
            title, image, summary, healthScore, steps
        }, {
            where: {
                id
            }
        })     
        res.status(200).json(getDiets)
    } catch (error) {
        res.status(404).send(error.message)
    }
}

module.exports = {updateRecipe}
