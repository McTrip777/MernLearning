import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'
import NewPlace from './places/pages/NewPlace';
import Users from './user/pages/Users';

function App() {
  return <div>
    <Switch>
      <Route exact path="/" component={Users} />
      <Route exact path="/places/new" component={NewPlace} />
      <Redirect to="/" />
    </Switch>
  </div>;
}

export default App;
