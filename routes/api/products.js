'use strict';

const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');
const { sanitizeProductParams, getPriceRange } = require('../../utils');
const jwtAuth = require('../../lib/jwtAuthMiddleware');
const multer = require('multer');
//const thumbnailRequester = require('../thumbnailRequester');
/*const storage = multer.diskStorage({
  destination: './public/images/',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
*/
// Get all Products. Accepts query params to filter the desired data.

router.get('/', jwtAuth, async (req, res, next) => {
  try {
    console.log('req', req.query);

    const product = sanitizeProductParams(req.query);
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const select = req.query.select;
    const sort = req.query.sort;

    const filter = {};

    if (product.name) filter.name = new RegExp('^' + product.name, 'i');
    if (product.for_sale) filter.for_sale = product.for_sale;
    if (product.price) filter.price = getPriceRange(product.price);
    if (product.tags) filter.tags = { $all: product.tags };
    const products = await Product.productsList(
      filter,
      skip,
      limit,
      select,
      sort
    );
    if (products.length === 0) {
      return res.json({ message: 'No products match your search criteria' });
    }
    res.json({ result: products });
  } catch (err) {
    next(err);
  }
});

// Gets all unique tags present in the products.

router.get('/tags', async (req, res, next) => {
  try {
    const tags = await Product.tagsList();
    res.json({ result: tags });
  } catch (err) {
    next(err);
  }
});

// Inserts a new Product to the database.

router.post('/', jwtAuth, async (req, res, next) => {
  try {
    const productParams = sanitizeProductParams(req.body);
    productParams.picture = '/images/' + productParams.picture;
    const product = new Product(productParams);
    const storedProduct = await product.save();
    res.status(201).json({ result: storedProduct });
  } catch (err) {
    next(err);
  }
});

// Updates an existing Product

router.put('/:id', jwtAuth, async (req, res, next) => {
  try {
    const _id = req.params.id;
    const productParams = sanitizeProductParams(req.body);
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: _id },
      productParams,
      {
        new: true,
      }
    );
    if (!updatedProduct) {
      res
        .status(404)
        .json({ error: 'The product couldnt be updated or it was not found' });
      return;
    }
    res.json({ result: updatedProduct });
  } catch (err) {
    next(err);
  }
});

// Removes an existing Product based on its _id.

router.delete('/:id', jwtAuth, async (req, res, next) => {
  try {
    const _id = req.params.id;
    const delete_product = await Product.deleteOne({ _id: _id });
    let result_message = `Product with id ${_id} was deleted`;
    if (delete_product.deletedCount == 0) {
      res.status(404);
      result_message = `Product with id ${_id} was not found`;
    }
    res.json({ result: result_message });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
