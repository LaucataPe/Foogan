//Express
const express = require('express')
const router = express.Router()

//Controllers
const {getAllRecipes} = require('../controllers/getAllRecipes')
const {getOneRecipe} = require('../controllers/getOneRecipe')


router.get('/recipes', getAllRecipes)
router.get('/recipe/:id', getOneRecipe)


module.exports = {router}
