import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
// import Main from './Main.jsx';

function App() {
  // creates switchboard

  return (
      <Router>
          <Switch>
              <Route exact path="/">
                  <Login />
              </Route>
              <Route path="/signup">
                  <SignUp />
              </Route>
              <Route path="/main">
                  <p>This is the main route</p>
              </Route>
          </Switch>
      </Router>
  );
}

export default App;