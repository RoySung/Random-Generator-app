import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import syncHistoryWithStore from 'react-router-redux/lib/sync';
import App from './containers/App';
import MainContent from './components/MainContent';
import LoginPage from './components/LoginPage';
import RandomNumberContent from './components/RandomNumberContent';
import RandomCustomContent from './components/RandomCustomContent';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={history}>
        <Route path="/" component={App} >
          <IndexRoute component={MainContent} />
          <Route path="number" component={RandomNumberContent} />
          <Route path="custom" component={RandomCustomContent} />
        </Route>
        <Route path="login" component={LoginPage} />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
);
