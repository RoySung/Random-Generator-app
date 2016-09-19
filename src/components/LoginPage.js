import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './loginpage.cssmodule.css';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
import { User } from '../actions/user';

@cssmodules(styles)
class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isFailed: false
    };
    this.handleGoogleSigin = this.handleGoogleSigin.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleGoogleSigin() {
    const user = new User();
    this.handleOpen();
    user.loginWithGoogle().then((result) => {
      console.log(result);
      this.context.router.push('/');
    }).catch((error) => {
      console.log(error);
      this.setState({isFailed: true});
    });
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({
      open: false,
      isFailed: false
    });
  }

  render() {
    let dialogContent;
    let actions;
    if (this.state.isFailed) {
      dialogContent = (
        <div>Login Fail, Please try again!</div>
      );
      actions = (
        <FlatButton
          label="OK"
          primary
          keyboardFocused
          onTouchTap={this.handleClose}
        />
      );
    } else {
      dialogContent = (
        <CircularProgress />
      );
    }

    return (
      <div className="loginpage-component" styleName="loginpage-component">
        <RaisedButton
          label="Login with Google"
          styleName="button"
          primary
          icon={<AccountBox />}
          onTouchTap={this.handleGoogleSigin}
        />
        <Dialog
          title="Login"
          actions={actions}
          modal
          styleName="dialogContent"
          open={this.state.open}
        >
          {dialogContent}
        </Dialog>
      </div>
    );
  }
}

LoginPage.displayName = 'LoginPage';
LoginPage.propTypes = {};
LoginPage.defaultProps = {};
LoginPage.contextTypes = {
  router: React.PropTypes.object
};

export default LoginPage;
