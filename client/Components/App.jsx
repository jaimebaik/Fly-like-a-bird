import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route, 
  Redirect
} from "react-router-dom";
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Main from './Main.jsx';

function App() {
    const [isLoggedIn, setLoggedIn] = useState(false);
  // creates switchboard
  useEffect(() => {
    axios({
        method: 'GET',
        url: '/users/isLoggedIn',
    })
    .then(res => {
        console.log('axios isloggedin resolved and the res is', res)
        if (res.status === 200) {
            if (res.data.isLoggedIn) {
                setLoggedIn(true)
            }
        }
    })
  }, [])

  return (
      <Router>
      {isLoggedIn === true ? 
                    <Redirect to="/main" /> : 
                    <Redirect to="/" />
                }
          <Switch>
              <Route exact path="/">
                  <Login />
              </Route>
              <Route path="/signup">
                  <SignUp />
              </Route>
              <Route path="/main">
                  <Main />
              </Route>
          </Switch>
      </Router>
  );
}

export default App;