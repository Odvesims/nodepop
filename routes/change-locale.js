const express = require('express');
const router = express.Router();

/** GET /change-locale */

router.get('/:locale', (req, res, next) => {
  const locale = req.params.locale;
  res.cookie('nodepop-locale', locale, {
    maxAge: 1000 * 60 * 24,
  });
  res.redirect(req.get('referer'));
});

module.exports = router;
