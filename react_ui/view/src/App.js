import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Main from './pages/Main'
import Cockpit from './pages/Cockpit'
import {AuthProvider} from './Component/Auth/Auth'
import PrivateRoute from './Component/Auth/PrivateRoute'




class App extends Component {
  render() {
    return (
      <AuthProvider>
      <Router basename="/react-auth-ui/">
        <div>
              <Route path="/" exact component={Cockpit}></Route>
              <PrivateRoute path="/main" component={Main}></PrivateRoute>
        </div>
      </Router>
      </AuthProvider>
    
    );
  }
}

export default App;
