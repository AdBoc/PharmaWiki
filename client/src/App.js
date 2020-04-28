import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './styles/normalizeAndReset.css'

// ActiveSubstances from './components/ActiveSubstances'
import Nav from './components/Nav'
import Login from './components/Login'
import Register from './components/Register'
import Drugs from './components/Drugs'
import User from './components/User'
import PageError from './components/PageError'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route exact path='/' component={Drugs} />
          <Route path='/active' component={Login} />
          <Route path='/user' component={User}/>
          <Route component={PageError} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

