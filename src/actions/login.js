import { LOGIN } from './const';

export const login = (parameter) => (
  {
    type: LOGIN,
    user: parameter
  }
);

// module.exports = (parameter) => (
//   { type: LOGIN, parameter }
// );
