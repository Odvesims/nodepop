'use strict';

const jwt = require('jsonwebtoken');
const User = require('../models/User');

class LoginController {
  index(req, res, next) {
    res.locals.error = '';
    res.render('login');
  }

  async post(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        res.locals.error = 'User credentials are not valid.';
        res.render('login');
        return;
      }

      req.session.userLoggedIn = {
        _id: user._id,
      };
      res.redirect('/user_page');
    } catch (err) {
      next(err);
    }
  }

  logout(req, res, next) {
    req.session.regenerate((err) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect('/');
    });
  }

  async postJWT(req, res, next) {
    try {
      console.log('User', User);
      const { email, password } = req.body;
      if (email === undefined || password === undefined) {
        res.locals.error = "Email/Password can't be blank";
        next();
      }
      const user = await User.findOne({ email });
      console.log('User', user);
      if (!user || user === null || !(await user.comparePassword(password))) {
        res.locals.error = 'User credentials are not valid.';
        next();
      }
      jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: '2d',
        },
        (err, jwtToken) => {
          if (err) {
            next(err);
            return;
          }
          res.json({ token: jwtToken });
        }
      );
    } catch (err) {
      console.log('error', err.message);
      next();
    }
  }
}

module.exports = LoginController;
