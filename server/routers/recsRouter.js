const express = require('express');
const router = express.Router();
const recsController = require('../controllers/recsController');

router.post('/', 
  recsController.getRecs,
  (req, res) => {
    return res.status(200).json(res.locals.cityData)
});

router.get('/months/:continent', recsController.getMonths, (req, res) => {
  return res.status(200).json({countries: res.locals.countries})
})

module.exports = router;