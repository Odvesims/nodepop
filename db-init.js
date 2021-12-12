'user strict';

const mongoose = require('mongoose');

mongoose.connection.once('open', () => {
  console.log(`Connected to ${mongoose.connection.name} database`);
});

mongoose.connection.on('error', (err) => {
  console.log(`Database connection error" ${err.message}`);
  process.exit(1);
});

mongoose.connect('mongodb://localhost/nodepop', {});

const Product = require('./models/Product');
const User = require('./models/User');
const productInitialData = require('./products_initial_data.json');

main().catch((error) =>
  console.log(`An error was encountdered: ${error.message}`)
);

async function initializeProducts() {
  // Clears database from previous data.
  const removed = await Product.deleteMany();
  console.log(
    `${removed.deletedCount} products were removed from the database.`
  );
  // Inserts initial data
  const products = await Product.insertMany(productInitialData.products);
  console.log(`Inserted products: ${products}`);
}

async function initializeUsers() {
  // Clear database from previous user data.
  const removed = await User.deleteMany();
  console.log(`${removed.deletedCount} users were removed from the database.`);
  // Inserts initial data
  const user = await User.insertMany([
    {
      email: 'test@example.com',
      password: await User.hashPassword('test1234'),
    },
  ]);
  console.log(`Inserted user: ${user}`);
}

async function main() {
  await initializeProducts();
  await initializeUsers();
  mongoose.connection.close();
}
