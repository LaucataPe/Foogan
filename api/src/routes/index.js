//Express
const express = require('express')
const router = express.Router()

//Controllers
const {getAllRecipes} = require('../controllers/getAllRecipes')
const {getOneRecipe} = require('../controllers/getOneRecipe')
const {createRecipe} = require('../controllers/createRecipe')
const {getAllDiets} = require('../controllers/getDiets')
const {getDbDiets} = require('../controllers/getDbDiets')

router.get('/recipes', getAllRecipes)
router.get('/diets', getAllDiets)
router.get('/diets/db', getDbDiets)
router.get('/recipe/:id', getOneRecipe)
router.post('/recipes', createRecipe)


module.exports = {router}
