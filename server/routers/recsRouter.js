const express = require('express');
const router = express.Router();
const recsController = require('../controllers/recsController');

router.post('/', 
  recsController.getRecs,
  (req, res) => {
    return res.status(200).json(res.locals.cityData)
})

module.exports = router;