import React from 'react';
import './app.css';
import AppBar from 'material-ui/AppBar';
import MainContent from './MainContent';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import { Link } from 'react-router';

const indexLink = <Link to="/" />;

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        <AppBar
          title="Random Generator"
          iconElementLeft={<IconButton containerElement={indexLink} ><ActionHome /></IconButton>}
          className="app-bar"
        />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
