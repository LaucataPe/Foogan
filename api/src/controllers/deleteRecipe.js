const { Recipe } = require('../db')

const deleteRecipe = async (req, res) =>{
    const {id} = req.params
    try {
        const deleteRecipe = await Recipe.destroy({
            where: {
              id
            }
          });     
        res.status(200).json(deleteRecipe)
    } catch (error) {
        res.status(404).send(error.message)
    }
}

module.exports = {deleteRecipe}
