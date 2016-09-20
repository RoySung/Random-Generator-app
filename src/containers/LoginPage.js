import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { login } from '../actions/';
import Main from '../components/LoginPage';

class LoginPage extends Component {
  render() {
    const { actions } = this.props;
    return <Main actions={actions} />;
  }
}

LoginPage.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const props = {};
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = { login };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
