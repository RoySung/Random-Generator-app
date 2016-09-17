import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './maincontent.cssmodule.css';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

const yeomanImage = require('../images/yeoman.png');

const numberLink = <Link to="/number" />;
const customLink = <Link to="/custom" />;

@cssmodules(styles)
class MainContent extends React.Component {

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
          label="Random Customization"
          primary
          styleName="primary-button"
          containerElement={customLink}
        />
      </div>
    );
  }
}

MainContent.displayName = 'MainContent';
MainContent.propTypes = {};
MainContent.defaultProps = {};

export default MainContent;
