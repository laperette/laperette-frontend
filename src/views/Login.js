import React from 'react';
import { UserService } from '../services/UserService';
import { Redirect } from 'react-router';
import { Form, Segment, Message, Grid, Header } from 'semantic-ui-react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirectToReferrer: false,
      displayLoginError: false,
      isLoading: false
    };
    this.userSvc = UserService.getInstance();
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log('submit : ', this.state);
    // fetch({url:})
    const { email, password } = this.state;
    this.setState({ isLoading: true });
    this.userSvc
      .login({ email, password })
      .then(isAuth => {
        this.setState({ redirectToReferrer: true, isLoading: false });
      })
      .catch(err => {
        this.setState({ displayLoginError: true, isLoading: false });
      });
  };

  handleChange = event => {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const {
      redirectToReferrer,
      displayLoginError,
      email,
      password,
      isLoading
    } = this.state;
    if (redirectToReferrer) {
      console.log('login, redirect to : ', from);
      return <Redirect to={from} />;
    }
    return (
      <div className="login-form">
        <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Connexion
            </Header>
            <Form
              size="large"
              noValidate
              onSubmit={this.handleSubmit}
              error={displayLoginError}
              loading={isLoading}
            >
              <Segment raised>
                <Form.Input
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="adresse-mail@gogol.cool"
                  value={email}
                  onChange={this.handleChange}
                  autoComplete="email"
                />
                <Form.Input
                  label="Mot de passe"
                  name="password"
                  type="password"
                  placeholder="mot de passe"
                  value={password}
                  onChange={this.handleChange}
                  autoComplete="current-password"
                />
                <Form.Button content="Submit" />
                <Message
                  error
                  header="Action Forbidden"
                  content="You can only sign up for an account once with a given e-mail address."
                />
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Login;
