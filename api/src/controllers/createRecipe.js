const { Recipe, Diet } = require('../db')
const cloudinary =  require('../utils/cloudinary')

const createRecipe = async (req, res) =>{
    const { title, image, summary, healthScore, steps, diets } = req.body
    try {
        const urlImage = await cloudinary.uploader.upload(image, {
            folder: "Recipes"
        })
        const url = urlImage.secure_url

        const newRecipe = await Recipe.create({
            title,summary, healthScore, steps, 
            image: url
        })
        
        await newRecipe.addDiet(diets);
        res.status(200).json(newRecipe)
    } catch (error) {
        res.status(404).send(error.message)
    }
}

module.exports = {createRecipe}

