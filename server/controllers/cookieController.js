const jwt = require('jsonwebtoken');
const db = require('../models/tempModels');

const cookieController = {};

cookieController.verifyCookie = (req, res, next) => {
  const {cookie} = req.cookies;
  // const {cookie} = req.body;
  //if cookie expired or cookie does not exist
  if(!cookie) return res.sendStatus(401);
  jwt.verify(cookie, 'test', async (err, decoded) => {
    //if there is an error when verifying jwt token
    if (err) {
      return res.sendStatus(401);
    }
    else {
      //check if the user email is in db
      const cookieQuery = `SELECT * FROM "Users" WHERE email=($1)`
      const cookieValue = [decoded.email];
      const user =  await db.query(cookieQuery, cookieValue);
      if (user.rows.length !== 0)  {
        console.log('cookie found')
        res.locals.isLoggedIn = true;
        return next();
      } else {
        return res.sendStatus(401);
      }
    }
  });
};

cookieController.createCookie = (req, res, next) => {
  if (res.locals.isLoggedIn) {
    const payload = {
      id: res.locals.user.user_id,
      email: res.locals.user.email
    };
    // create a token, it expires in 1 day, you can change it to anytime
    const token = jwt.sign(payload, 'test', {expiresIn: '1d'});
    // setting cookie
    res.cookie('cookie', token, {maxAge: 86400000, httpOnly: true});
    return next();
  } else {
    return res.sendStatus(401);
  }
};

module.exports = cookieController;