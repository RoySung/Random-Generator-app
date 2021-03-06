import React, {
  Component,
  PropTypes
} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {} from '../actions/';
import Main from '../components/RandomCustomList';

class RandomCustomList extends Component {
  render() {
    const { actions, user } = this.props;
    return <Main actions={actions} user={user} />;
  }
}

RandomCustomList.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const props = {
    user: state.user
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {};
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(RandomCustomList);
