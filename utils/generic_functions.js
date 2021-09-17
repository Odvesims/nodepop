'use-strict'

const getPriceRange = (price) => {
  const splittedPrice = price.split('-');
  const priceRange = {};
  if(splittedPrice.length === 1){
    priceRange = price;
  } else if(splittedPrice[0] === ''){
    priceRange = { '$gte': 0, '$lte': splittedPrice[1]}
  } else if(splittedPrice[1] === ''){
    priceRange = { '$gte': splittedPrice[0] , '$lte': 0}
  } else{
    priceRange = { '$gte': splittedPrice[0] , '$lte': splittedPrice[1]}
  }
  return priceRange;
};

module.exports = { getPriceRange };