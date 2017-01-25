import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import syncHistoryWithStore from 'react-router-redux/lib/sync';
import App from './containers/App';
import MainContent from './components/MainContent';
import LoginPage from './containers/LoginPage';
import RandomNumberContent from './components/RandomNumberContent';
import RandomCustomContent from './containers/RandomCustomContent';
import RandomCustomList from './containers/RandomCustomList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import './config/ReactotronConfig';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={history}>
        <Route path="/" component={App} >
          <IndexRoute component={MainContent} />
          <Route path="number" component={RandomNumberContent} />
          <Route path="list" component={RandomCustomList} />
          <Route path="custom" component={RandomCustomContent} />
        </Route>
        <Route path="login" component={LoginPage} />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
);
