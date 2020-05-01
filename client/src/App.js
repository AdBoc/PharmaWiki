import React from 'react';
import { Router, Switch, Route } from 'react-router-dom'
import './styles/normalizeAndReset.css'
import { history } from './helpers/history'

// ActiveSubstances from './components/ActiveSubstances'
import Nav from './components/Nav'
import Login from './components/Login'
import Register from './components/Register'
import Drugs from './components/Drugs'
import User from './components/User'
import PageError from './components/PageError'
import { PrivateRoute } from './helpers/privateRoute'

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Nav />
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route exact path='/' component={Drugs} />
          <Route path='/active' component={Login} />
          <PrivateRoute path='/user' component={User} />
          <Route component={PageError} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

