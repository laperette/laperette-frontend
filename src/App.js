import React, { Component } from 'react';
import Login from './views/Login';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import { UserService } from './services/UserService';

import Loadable from 'react-loadable';
import { Loader } from 'semantic-ui-react';
const Loading = () => <Loader active>Loading</Loader>;
const Home = Loadable({
  loader: () => import('./views/Home'),
  loading: Loading
});

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        UserService.getInstance().user.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute path="/home" component={Home} />
          <Redirect to="/home" />
        </Switch>
      </Router>
    );
  }
}

export default App;
