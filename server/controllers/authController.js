const db = require('../models/tempModels');
const bcrypt = require('bcryptjs');

const authController = {};

authController.userSignin = (req, res, next) => {
  console.log('authController hit')
  const { email, pass } = req.body;
  //check if user input is not null
  if (!email || !pass) return res.status(401).json({emptySignin: true});
  // check if email exists in the database
  const emailQuery = `SELECT * FROM "Users" WHERE email=($1)`;
  const emailValue = [email];
  db.query(emailQuery, emailValue)
  .then(user => {
    //if user is not found 
    if (user.rows.length === 0) return res.sendStatus(401);
    // if email is found in database, check if it has matching password
    const password = user.rows[0].pass;
    // if the passwords match, go to the next middleware
    bcrypt.compare(pass, password)
    .then(result => {
      // if they don't match, send status code to notify front end
      if(!result) return res.sendStatus(401);
      res.locals.isLoggedIn = true;
      res.locals.user = user.rows[0];
      return next();
    })
    .catch(err => {
      return next({
        log: 'bcrypt.compare: ERROR: Error comparing passwords',
        message: { err: 'Error occurred in bcrypt.compare. Check server logs for more details.'}
      })
    })
  })
  .catch(err => {
    return next({
        log: 'authController.userSignin: ERROR: No email found in database',
        message: { err: 'Error occurred in authController.userSignin. Check server logs for more details.'}
  })
})
};

authController.isLoggedIn = (req, res, next) => {
  if(!res.locals.isLoggedIn) res.locals.isLoggedIn = false;
  return next();
}

authController.signUp = (req, res, next) => {
  let { email, pass } = req.body;
  // check if values are null
  if (!email || !pass) return res.status(401).json({emptySignUp: true});
  //hash password
  bcrypt.hash(pass, 10, (err, hash) => {
    pass = hash;
  });
  // check if email already exists in database
  const emailQuery = `SELECT * FROM "Users" WHERE email=($1)`;
  const emailValue = [email];
  db.query(emailQuery, emailValue)
    .then((data) => {
      // if email already exists, send message to front end
      if (data.rows.length === 0) {
        console.log('rows empty');
        const userQuery = `INSERT INTO "Users" (email, pass) VALUES ($1, $2) RETURNING user_id, email`;
        const userValue = [email, pass];
        db.query(userQuery, userValue)
          .then(user => {
            res.locals.isLoggedIn = true;
            res.locals.user = user.rows[0];
            return next();
          })
          .catch(err => {
            return next({
              log: 'authController.signUp: ERROR: Trouble added signup info to database',
              message: { err: 'Error occurred in authController.signUp. Check server logs for more details.'}
            })
          })
      }
      else return res.status(409).json({emailExists: true});
    })
    // if email doesn't exist, add it and the password (hashed) to the database
    .catch(err => {
      return next({
          log: 'authController.signUp: ERROR: Query is not working to check if email already exists in database',
          message: { err: 'Error occurred in authController.singUp. Check server logs for more details.'}
      })
    })
}

module.exports = authController;