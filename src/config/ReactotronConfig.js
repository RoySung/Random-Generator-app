/* eslint-disable global-require */
if (process.env.NODE_ENV !== 'production') {
  const Reactotron = require('reactotron-react-js').default;
  const { trackGlobalErrors } = require('reactotron-react-js');
  const tronsauce = require('reactotron-apisauce');

  Reactotron
    .configure({ name: 'Demo Time!', secure: false })
    .use(tronsauce())
    .use(trackGlobalErrors({ offline: false }))
    .connect();

  console.tron = Reactotron;
}
/* eslint-disable global-require */
