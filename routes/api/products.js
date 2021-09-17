'use strict'

const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');
const { sanitizeProductParams, getPriceRange } = require ('../../utils');

// Get all Products 

router.get('/', async (req, res, next) => {
  try {
    const product = sanitizeProductParams(req.query)
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const select = req.query.select;
    const sort = req.query.sort;

    const filter = {}

    if(product.name) filter.name = new RegExp('^' + product.name, "i");
    if(product.for_sale) filter.for_sale = product.for_sale
    if(product.price) filter.price = getPriceRange(product.price)
    if(product.tags) filter.tags = product.tags
    
    const products = await Product.productsList(filter, skip, limit, select, sort)
    res.json({result: products})
    
  } catch (err) {
    next(err)
  }
});


// New Product

router.post('/', async (req, res, next) => {
  try {
    const productParams = sanitizeProductParams(req.query);
    console.log(productParams);
    const product = new Product(productParams);
    const storedProduct = await product.save()
    res.status(201).json({result: storedProduct})
  } catch (err){
    next(err)
  }
});

// Update a Product

router.put('/:id', async (req, res, next) => {
  try {
    const _id = req.params.id;
    const productParams = sanitizeProductParams(req.body);
    const updatedProduct = await Product.findOneAndUpdate({_id: _id}, productParams, {
      new: true,
    });
    if(!updatedProduct){
      res.status(404).json({ error: 'Product not found'})
      return;
    }   
    res.json({result: updatedProduct})
  } catch (err){
    next(err)
  }
});

// Remove a Product

router.delete('/:id', async (req, res, next) => {
  try {
    const _id = req.params.id;
    const delete_product = await Product.deleteOne({_id: _id});
    console.log('delete product', delete_product);
    let result_message = `Product with id ${_id} was deleted`;
    if(delete_product.deletedCount == 0) {
      res.status(404);
      result_message = `Product with id ${_id} was not found`;
    }
    res.json({result: result_message});
  } catch (err){
    next(err)
  }
});

module.exports = router;