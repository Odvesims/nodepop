const {nameValidations, priceValidations, pictureValidations, tagsValidations } = require('./productCustomValidators');
const { sanitizeProductParams } = require('./sanitizeParams');
const { getPriceRange } = require('./generic_functions');

module.exports = {
  nameValidations,
  priceValidations,
  pictureValidations,
  tagsValidations,
  sanitizeProductParams,
  getPriceRange,
}