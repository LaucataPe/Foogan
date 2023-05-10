//Express
const express = require('express')
const router = express.Router()

//Controllers
const {getAllRecipes} = require('../controllers/getAllRecipes')
const {getOneRecipe} = require('../controllers/getOneRecipe')
const {createRecipe} = require('../controllers/createRecipe')
//const {searchRecipe} = require('../controllers/searchRecipe')

router.get('/recipes', getAllRecipes)
router.get('/recipe/:id', getOneRecipe)
//router.get('/recipes/name', searchRecipe)
router.post('/recipes', createRecipe)


module.exports = {router}
