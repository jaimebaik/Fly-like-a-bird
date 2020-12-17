const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const cookieController = require('../controllers/cookieController');

userRouter.get("/logout", (req, res) => {
  req.logout();
  res.send(req.user);
});

userRouter.get("/google", passport.authenticate("google", {
    scope: ["profile"]
  }));

userRouter.get("/google/redirect",
  passport.authenticate('google', {failureRedirect: '/'}), 
  cookieController.createCookie, 
  (req, res) => {
    console.log('redirect');
    res.send(req.user);
    res.send("you reached the redirect URI");
});

module.exports = userRouter;