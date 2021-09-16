'use strict';

const mongoose = require('mongoose');

mongoose.connection.once('open', () =>{
    console.log(`Connected to ${mongoose.connection.name} database`);
});

mongoose.connection.on('error', err => {
  console.log(`Database connection error" ${err.message}`);
  process.exit(1);
});

mongoose.connect('mongodb://localhost/nodepop', {});

module.exports = mongoose.connection