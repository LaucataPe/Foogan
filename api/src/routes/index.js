//Express
const express = require('express')
const router = express.Router()

//Controllers
const {getAllRecipes} = require('../controllers/getAllRecipes')
const {getOneRecipe} = require('../controllers/getOneRecipe')
const {createRecipe} = require('../controllers/createRecipe')

router.get('/recipes', getAllRecipes)
router.get('/recipe/:id', getOneRecipe)
router.post('/create', createRecipe)


module.exports = {router}
