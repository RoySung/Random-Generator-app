import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

import Reactotron from 'reactotron-react-js';
import createReactotronEnhancer from 'reactotron-redux';
const reactotronEnhancer = createReactotronEnhancer(Reactotron);

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

function reduxStore(initialState) {
  const store = createStoreWithMiddleware(reducers, initialState,
    reactotronEnhancer,
    window.devToolsExtension && window.devToolsExtension());

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      // We need to require for hot reloadign to work properly.
      const nextReducer = require('../reducers');  // eslint-disable-line global-require

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

export default reduxStore;
