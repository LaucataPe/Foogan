//Express
const express = require('express')
const router = express.Router()

//Controllers
const {getAllRecipes} = require('../controllers/getAllRecipes')
const {getOneRecipe} = require('../controllers/getOneRecipe')
const {getAllDiets} = require('../controllers/getDiets')
const {getDbDiets} = require('../controllers/getDbDiets')

router.get('/recipes', getAllRecipes)
router.get('/diets', getAllDiets)
router.get('/diets/db', getDbDiets)
router.get('/recipe/:id', getOneRecipe)

//CRUD
const {createRecipe} = require('../controllers/createRecipe')
const {updateRecipe} = require('../controllers/updateRecipe')
const {deleteRecipe} = require('../controllers/deleteRecipe')

//CRUD
router.post('/recipes', createRecipe)
router.put('/update/:id', updateRecipe)
router.delete('/delete/:id', deleteRecipe)


module.exports = {router}
