const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signin', 
  authController.userSignin, 
  (req, res) => {
    console.log('successful sign in');
    return res.sendStatus(200);
})

router.get('/isloggedin', 
  // verify cookie middleware
  (req, res) => {
  return res.status(200).json(res.locals.isLoggedIn)
})

router.post('/createAccount',
  authController.signUp,
  (req, res) => {
    return res.sendStatus(200)
  });

// router.get('/createAccount')

// router.post('/logout')
module.exports = router;