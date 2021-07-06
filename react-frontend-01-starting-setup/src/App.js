import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'
import NewPlace from './places/pages/NewPlace';
import Users from './User/pages/Users';
import MainNavigation from './shared/components/Navigation/jsx/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';

function App() {
  return <div>
    <MainNavigation />
    <main>
      <Switch>
        <Route exact path="/" component={Users} />
        <Route exact path="/places/new" component={NewPlace} />
        <Route exact path="/:userId/places" exact component={UserPlaces} />
        <Redirect to="/" />
      </Switch>
    </main>
  </div>;
}

export default App;
