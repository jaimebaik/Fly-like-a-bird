const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const userRouter = require('./routers/userRouter');
const recsRouter = require('./routers/recsRouter');
const oauthRouter = require('./routers/oauthRouter');

const passport = require('passport');
const passportSetup = require('../config/passport-setup');

const app = express();
// parses body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// parses cookies
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

// routers
app.use('/users', userRouter);
app.use('/recs', recsRouter);
app.use('/oauth', oauthRouter);

//serve the bundle file
app.use('/build', express.static(path.join(__dirname, '../build/')) )

//serve the index page at /
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'))
});

app.use('/*', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../client/index.html')));


// global error handling
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
})

// starts server on port 3000
app.listen(3000, ()=>{
  console.log('listening on 3000')
})