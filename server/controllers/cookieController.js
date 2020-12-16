const jwt = require('jsonwebtoken');
const db = require('../models/tempModels');

const cookieController = {};

cookieController.verifyCookie = (req, res, next) => {
  const cookie = req.cookies;
  // const {cookie} = req.body;
  jwt.verify(cookie, 'test', async (err, decoded) => {
    if (err) {
      return res.sendStatus(401);
    }
    else {
      const cookieQuery = `SELECT * FROM "Users" WHERE email=($1)`
      const cookieValue = [decoded.email];
      const user =  await db.query(cookieQuery, cookieValue);
      if (user.rows.length !== 0)  {
        console.log('cookie found')
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
    const token = jwt.sign(payload, 'test');
    // setting cookie
    res.cookie('cookie', token, {maxAge: 86400000, httpOnly: true});
    return next();
  } else {
    return res.sendStatus(401);
  }
};

module.exports = cookieController;