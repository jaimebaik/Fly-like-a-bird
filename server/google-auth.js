import { google } from 'googleapis';
const db = require('../models/tempModels');


const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    'http://localhost:8080',
);

function getGoogleAuthURL() {
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ];

    return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: scopes, // If you only need one scope you can pass it as string
      });
}

async function getGoogleUser({ code }) {
    const { tokens } = await oauth2Client.getToken(code);
  
    oauth2Client.setCredentials(tokens);
  
    // Fetch the user's profile with the access token and bearer
    const googleUser = await axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokens.id_token}`,
          },
        },
      )
      .then(res => res.data)
      .catch(error => {
        throw new Error(error.message);
      });
  
    return googleUser;
  }

  async googleAuth(input, context) {
    const googleUser = await getGoogleUser({ code: input.code });
    console.log('googleUser: ', googleUser);
    console.log('input: ', input);
    console.log('context: ', context);
    // db.query(emailQuery, emailValue)
    // .then(user => {
    //   if(user.rows.length === 0){
    //     const userQuery = `INSERT INTO "Users" (email) VALUES ($1) RETURNING user_id, email`;
    //     const userValue = [email];
    //     db.query(userQuery, userValue)
    //     .then(user => {
    //       res.locals.user = user.rows[0];
    //     })
    //   }
    //   else res.locals.user = {user_id: user.rows[0].user_id, email: user.rows[0].email}
    //   res.locals.isLoggedIn = true;
    //   done(res.locals.user, res.locals.isLoggedIn);
    // })








    // let user = await this.userModel
    //   .findOne({ githubId: String(googleUser.id) })
    //   .exec();

    // if (user) {
    //   // Update their profile

    // }

    // if (!user) {
    //   // Create the user in the database
    //   user = new User()
    // }

    // Generate a JWT, add it as a cookie

    // return user;
  };