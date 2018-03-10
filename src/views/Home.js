import React from 'react';
import { Route } from 'react-router-dom';
import { UserService } from '../services/UserService';
import { Redirect } from 'react-router';
//import Calendar from '../components/Calendar';
import Book from '../components/Book';
import Navbar from '../components/Navbar';
import { Container, Loader } from 'semantic-ui-react';
import Loadable from 'react-loadable';
const Loading = () => <Loader active>Loading ...</Loader>;

const Calendar = Loadable({
  loader: () => import('../components/Calendar'),
  loading: Loading
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirectToLogin: false };
  }
  logout = () => {
    UserService.getInstance().logout();
    this.setState({ redirectToLogin: true });
  };
  render() {
    if (this.state.redirectToLogin) {
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: '/home' }
          }}
        />
      );
    }
    const { match } = this.props;
    return (
      <div>
        <Navbar match={match} onLogout={this.logout} />
        <Container>
          <Route path={`${match.url}/calendar`} component={Calendar} />
          <Route path={`${match.url}/book`} component={Book} />
        </Container>
      </div>
    );
  }
}
export default Home;
