const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const cookieController = require('../controllers/cookieController');

router.post('/signin', 
  authController.userSignin, 
  cookieController.createCookie,
  (req, res) => {
    console.log('successful sign in');
    return res.sendStatus(200);
})

router.get('/isloggedin', 
  // verify cookie middleware
  cookieController.verifyCookie,
  (req, res) => {
  return res.status(200).json({isLoggedIn: res.locals.isLoggedIn})
})

router.post('/createAccount',
  authController.signUp,
  cookieController.createCookie,
  (req, res) => {
    return res.sendStatus(200)
  });

// router.get('/createAccount')

router.get('/logout', cookieController.deleteCookie, (req, res) => {
  return res.sendStatus(200)
})

module.exports = router;