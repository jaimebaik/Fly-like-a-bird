const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('../server/keys');
const GOOGLE_CLIENT_ID = keys.google.clientID;
const GOOGLE_CLIENT_SECRET = keys.google.clientSecret;

const db = require('../server/models/tempModels');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/main"
  },
  (accessToken, refreshToken, profile, done) => {
    console.log('passport use hit');
    // check if email exists in the database
    const emailQuery = `SELECT * FROM "Users" WHERE email=($1)`;
    const emailValue = [profile.email];
    console.log('profile', profile);
    db.query(emailQuery, emailValue)
    .then(user => {
      if(user.rows.length === 0){
        const userQuery = `INSERT INTO "Users" (email) VALUES ($1) RETURNING user_id, email`;
        const userValue = [email];
        db.query(userQuery, userValue)
        .then(user => {
          return done(null, user.rows[0]);
        })
      }
      return done(null, {user_id: user.rows[0].user_id, email: user.rows[0].email});
    })

}
));