import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './loginpage.cssmodule.css';

@cssmodules(styles)
class LoginPage extends React.Component {

  render() {
    return (
      <div className="loginpage-component" styleName="loginpage-component">
        Please edit src/components//LoginPage.js to update this component!
      </div>
    );
  }
}

LoginPage.displayName = 'LoginPage';
LoginPage.propTypes = {};
LoginPage.defaultProps = {};

export default LoginPage;
