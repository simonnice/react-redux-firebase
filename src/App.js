import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import './App.css';
import AppNavbar from './components/layout/AppNavbar'
import Dashboard from './components/layout/Dashboard'
import AddClient from './components/clients/AddClient'
import ClientDetails from './components/clients/ClientDetails'
import EditClient from './components/clients/EditClient'
import Login from './components/auth/Login'
import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth'
import Settings from './components/settings/Settings'
import Register from './components/auth/Register'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <AppNavbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={UserIsAuthenticated(Dashboard)} />
              <Route path="/client/add" component={UserIsAuthenticated(AddClient)}></Route>
              <Route path="/client/edit/:id" component={UserIsAuthenticated(EditClient)}></Route>
              <Route path="/client/:id" component={UserIsAuthenticated(ClientDetails)}>
              </Route>
              <Route path="/login" component={UserIsNotAuthenticated(Login)}></Route>
              <Route path="/register" component={UserIsNotAuthenticated(Register)}></Route>
              <Route exact path="/settings" component={UserIsAuthenticated(Settings)} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
