import React, { PropTypes } from 'react';
import './app.css';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import HardwareKeyboardBackspace from 'material-ui/svg-icons/hardware/keyboard-backspace';
import { Link } from 'react-router';
import { User } from '../actions/user';

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
    let appBar = (
      <AppBar
        title="Random Generator"
        iconElementLeft={
          <IconButton containerElement={<Link to="/" />} ><ActionHome /></IconButton>
        }
        className="app-bar"
      />
    );
    if (this.props.path !== '/') {
      appBar = (
        <AppBar
          title="Random Generator"
          iconElementLeft={
            <IconButton onTouchTap={this.context.router.goBack}>
              <HardwareKeyboardBackspace />
            </IconButton>
          }
          className="app-bar"
        />
      );
    }
    return (
      <div className="app">
        {appBar}
        {this.props.children}
      </div>
    );
  }
}

AppComponent.defaultProps = {
};
AppComponent.propTypes = {
  actions: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired
};
AppComponent.contextTypes = {
  router: React.PropTypes.object
};

export default AppComponent;
