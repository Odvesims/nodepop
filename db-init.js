'user strict';

const mongooseDbConnection = require('./lib/database_connection');

const Product = require('./models/Product')
const productInitialData = require('./products_initial_data.json')

main().catch(error => console.log(`An error was encountdered: ${error.message}`));

async function initializeProducts() {
  // Clears database from previous data.
  const removed = await Product.deleteMany();
  console.log(`${removed.deletedCount} products were removed from the database.`);
  // Inserts initial data
  const products = await Product.insertMany(productInitialData.products)
  console.log(`Inserted products: ${products}`)
}


async function main() {
  await initializeProducts();
  mongooseDbConnection.close();
}
