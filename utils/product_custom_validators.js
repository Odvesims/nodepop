//Validations for product's name property
const nameValidations = [
  {
    validator: (name) => name.length > 0, 
    message: 'Name cant be blank'
  },
]

//Validations for product's price property
const priceValidations = [
  {
    validator: (price) => price > 0, 
    message: 'Price must be greater than 0'
  },
  {
    validator: (price) => isNaN(price) === false,
    message: 'Price must be a number'
  }
]

//Validations for product's picture property
const pictureValidations = [
  {
    validator: (picture) => picture.length > 0, 
    message: 'Picture cant be blank'
  },
  {
    validator: (picture) => (/^([A-Za-z0-9\-\/\_\.])+$/).test(picture) === true,
    message: 'Picture path format is not valid'
  }
]

//Validations for product's tags property
const tagsValidations = [
  {
    validator: (tags) => tags.length > 0 && tags.length < 5, 
    message: 'Product should have between 1-4 tags.'
  },
  {
    validator: (tag) => tag.every(t => t !== ''),
    message: 'Tag cant be blank'
  },
]

module.exports = {
  nameValidations,
  priceValidations,
  pictureValidations,
  tagsValidations
}