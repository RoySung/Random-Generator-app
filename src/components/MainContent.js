import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './maincontent.cssmodule.css';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import AssignmentReturn from 'material-ui/svg-icons/action/assignment-return';
import { User } from '../actions/user';
const yeomanImage = require('../images/yeoman.png');

const numberLink = <Link to="/number" />;
const listLink = <Link to="/list" />;

@cssmodules(styles)
class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    const user = new User();
    user.logoutCloud().then(() => {
      console.log('Logout Success!');
      this.context.router.push('/login');
    })
    .catch(() => {
      console.log('Logout Fail!');
    });
  }

  render() {
    return (
      <div className="maincontent-component" styleName="maincontent-component">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <br />
        <RaisedButton
          label="Random Number"
          primary
          styleName="primary-button"
          containerElement={numberLink}
        />
        <br />
        <RaisedButton
          label="Random Customization List"
          primary
          styleName="primary-button"
          containerElement={listLink}
        />
        <br />
        <RaisedButton
          label="Logout"
          primary
          styleName="primary-button"
          onTouchTap={this.logOut}
          icon={<AssignmentReturn />}
        />
      </div>
    );
  }
}

MainContent.displayName = 'MainContent';
MainContent.propTypes = {};
MainContent.defaultProps = {};
MainContent.contextTypes = {
  router: React.PropTypes.object
};

export default MainContent;
