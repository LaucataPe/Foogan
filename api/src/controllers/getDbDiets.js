const { Diet } = require('../db')

const getDbDiets = async (req, res) =>{
    try {
        const getDiets = await Diet.findAll()
        res.status(200).json(getDiets)
    } catch (error) {
        res.status(404).send(error.message)
    }
}

module.exports = {getDbDiets}