import React, { Suspense } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'
import MainNavigation from './shared/components/Navigation/jsx/MainNavigation';
// import Users from './users/pages/Users';
// import NewPlace from './places/pages/NewPlace';
// import UserPlaces from './places/pages/UserPlaces';
// import UpdatePlace from './places/pages/UpdatePlace';
// import Auth from './users/pages/Auth';
import LoadingSpinner from './shared/components/UIElements/jsx/LoadingSpinner';
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthContext } from './shared/context/auth-context'
import { useAuth } from './shared/hooks/auth-hook';

const Users = React.lazy(() => import('./users/pages/Users'))
const NewPlace = React.lazy(() => import('./places/pages/NewPlace'))
const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces'))
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace'))
const Auth = React.lazy(() => import('./users/pages/Auth'))

const App = () => {
  const { token, login, logout, userId } = useAuth()
  let routes;

  if (token) {
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

  return <AuthContext.Provider value={{ isLoggedIn: !!token, token: token, userId: userId, login: login, logout: logout }}>
    <Router>
      <MainNavigation />
      <main>
        <Suspense fallback={<div className="center"><LoadingSpinner /></div>}>
          {routes}
        </Suspense>
      </main>
    </Router>
  </AuthContext.Provider>;
}

export default App;
