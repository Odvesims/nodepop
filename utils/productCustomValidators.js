const nameValidations = [
  {
    validator: (name) => name.length > 0, 
    message: 'Name cant be blank'
  },
]

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

const pictureValidations = [
  {
    validator: (picture) => picture.length > 0 , 
    message: 'Picture cant be blank'
  }
]

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