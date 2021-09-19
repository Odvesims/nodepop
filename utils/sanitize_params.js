//Sanitizes the req.query/req.body to return a more legible object.

const sanitizeProductParams = (params) => {
  return {
    name: params.name,
    price: params.price,
    picture: params.picture,
    tags: params.tags,
    for_sale: params.for_sale,
  }
}
module.exports = { sanitizeProductParams };
