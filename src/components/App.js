import React, { PropTypes } from 'react';
import './app.css';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import { Link } from 'react-router';
import { User } from '../actions/user';

const indexLink = <Link to="/" />;

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.checkAuth();
  }

  checkAuth() {
    const user = new User();
    const { login } = this.props.actions;
    user.checkAuthCloud().then((result) => {
      console.log('Auth is exit.');
      login(result);
    })
    .catch(() => {
      this.context.router.push('/login');
    });
  }

  render() {
    return (
      <div className="app">
        <AppBar
          title="Random Generator"
          iconElementLeft={<IconButton containerElement={indexLink} ><ActionHome /></IconButton>}
          className="app-bar"
        />
        {this.props.children}
      </div>
    );
  }
}

AppComponent.defaultProps = {
};
AppComponent.propTypes = {
  actions: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};
AppComponent.contextTypes = {
  router: React.PropTypes.object
};

export default AppComponent;
