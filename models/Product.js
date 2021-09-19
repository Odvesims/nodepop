'use-strict'
// Definition of Product model

const mongoose = require('mongoose');

const { nameValidations, priceValidations, pictureValidations, tagsValidations } = require('../utils/')

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
    default: true
  },
  tags: {
    type: [String], 
    index: true, 
    validate: tagsValidations,
  }
});

//Returns a list of products based on the search filters provided

productSchema.statics.productsList = function(filter, skip, limit, select, sort){
  const query = Product.find(filter);
  query.skip(skip);
  query.limit(limit);
  query.select(select);
  query.sort(sort);
  return query.exec();
}

//Returns a unique list of tags.

productSchema.statics.tagsList = function(){
  const query = Product.distinct("tags");
  return query.exec();
}

const Product = mongoose.model('Product', productSchema);

module.exports = Product