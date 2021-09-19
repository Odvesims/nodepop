'use-strict'

/* Gets price param and formats it so it matches the required criteria
   Possible outcomes:
    1) A number (100.00)
    2) An object: 
      a) { '$lte': 100.00 } ( product's price is less than/equal to the given price )
      b) { '$gte': 100.00 } ( product's price is greater than/equal to the given price )
      c) { '$gte': 100.00, '$lte': 100.00 } ( product's price is within range )
*/
const getPriceRange = (price) => {
  const splittedPrice = price.split('-');
  let priceRange = {};
  if(splittedPrice.length === 1){
    priceRange = price;
  } else if(splittedPrice[0] === ''){
    priceRange = { '$lte': splittedPrice[1]}
  } else if(splittedPrice[1] === ''){
    priceRange = { '$gte': splittedPrice[0] }
  } else{
    priceRange = { '$gte': splittedPrice[0] , '$lte': splittedPrice[1]}
  }
  return priceRange;
};

module.exports = { getPriceRange };