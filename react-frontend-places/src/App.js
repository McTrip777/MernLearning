import React, { useState, useCallback } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'
import NewPlace from './places/pages/NewPlace';
import Users from './users/pages/Users';
import MainNavigation from './shared/components/Navigation/jsx/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './users/pages/Auth';
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthContext } from './shared/context/auth-context'

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = useCallback(() => setIsLoggedIn(true), [])
  const logout = useCallback(() => setIsLoggedIn(false), [])

  let routes;

  if (isLoggedIn) {
    routes = (<Switch>
      <Route exact path="/" component={Users} />
      <Route exact path="/places/new" component={NewPlace} />
      <Route exact path="/:userId/places" component={UserPlaces} />
      <Route path="/places/:placeId" component={UpdatePlace} />
      <Redirect to="/" />
    </Switch>)
  } else {
    routes = (<Switch>
      <Route exact path="/" component={Users} />
      <Route exact path="/:userId/places" component={UserPlaces} />
      <Route path="/auth" component={Auth} />
      <Redirect to="/auth" />
    </Switch>)
  }

  return <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}>
    <Router>
      <MainNavigation />
      <main>
        {routes}
      </main>
    </Router>
  </AuthContext.Provider>;
}

export default App;
