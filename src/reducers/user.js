/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import { LOGIN } from '../actions/const';

const initialState = {
  username: null,
  email: null,
  profile_picture: null,
  providerId: null,
  login_timestamp: []
};

function reducer(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  // const nextState = Object.assign({}, state);
  switch (action.type) {
    case LOGIN: {
      return action.user;
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}

module.exports = reducer;
