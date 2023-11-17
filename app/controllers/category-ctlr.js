const Category = require('../models/category-model')
const { validationResult } = require('express-validator')
const _ = require('lodash')
const categoryCltr = {}

categoryCltr.create = async (req, res) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }
   const body = _.pick(req.body, ['name'])
   const catergory = new Category(body)
   try {
      await catergory.save()
      res.json(catergory)
   } catch (e) {
      res.status(500).json(e)
   }
}

categoryCltr.list = async (req, res) => {
   try {
      const catergory = await Category.find()
      res.json(catergory)
   } catch (e) {
      res.status(500).json(e)
   }
}


module.exports = categoryCltr