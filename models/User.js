'use-strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

userSchema.statics.hashPassword = function (clearPassword) {
  return bcrypt.hash(clearPassword, 7);
};

userSchema.methods.comparePassword = function (clearPassword) {
  return bcrypt.compare(clearPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
