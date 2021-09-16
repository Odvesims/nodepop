'use-strict'

const mongoose = require('mongoose');

const { nameValidations, priceValidations, pictureValidations, tagsValidations } = require('../utils/productCustomValidators')

const productSchema = mongoose.Schema({
  name: {
    type: String,
    validate: nameValidations,
  },
  price: {
    type: Number,
    validate: priceValidations,
  },
  picture: {
    type: String,
    validate: pictureValidations,
  },
  for_sale: {
    type: Boolean,
    default: false
  },
  tags: {
    type: [String],
    validate: tagsValidations,
  }
});
module.exports = mongoose.model('Product', productSchema)