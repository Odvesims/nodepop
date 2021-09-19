var express = require('express');
var router = express.Router();
const Product = require('../models/Product');
const { sanitizeProductParams, getPriceRange } = require ('../utils');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try{
    const product = sanitizeProductParams(req.query)
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const select = req.query.select;
    const sort = req.query.sort;

    const filter = {}

    if(product.name) filter.name = new RegExp('^' + product.name, "i");
    if(product.for_sale) filter.for_sale = product.for_sale
    if(product.price) filter.price = getPriceRange(product.price)
    if(product.tags) filter.tags = { $all: product.tags } 
    
    const products = await Product.productsList(filter, skip, limit, select, sort);
    const tags = await Product.tagsList();
    res.render('index', { title: 'NodePop', products, tags: tags });
  } catch(err){
    next(err);
  }
});

module.exports = router;
