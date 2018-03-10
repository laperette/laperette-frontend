import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      activeItem: 'home'
    };
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const { match, onLogout } = this.props;
    return (
      <Menu>
        <Menu.Item
          name="home"
          active={activeItem === 'home'}
          href="/"
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={Link}
          name="calendar"
          active={activeItem === 'calendar'}
          onClick={this.handleItemClick}
          to={`${match.url}/calendar`}
        >
          Calendrier
        </Menu.Item>
        <Menu.Item
          as={Link}
          name="book"
          active={activeItem === 'book'}
          onClick={this.handleItemClick}
          to={`${match.url}/book`}
        >
          Réserver
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item onClick={onLogout}>Déconnexion</Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
