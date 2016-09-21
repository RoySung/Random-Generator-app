import React, {
  Component,
  PropTypes
} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {} from '../actions/';
import Main from '../components/RandomCustomContent';

class RandomCustomContent extends Component {
  render() {
    const { actions, user } = this.props;
    const item = this.props.location.query.item;
    return <Main actions={actions} user={user} item={item} />;
  }
}

RandomCustomContent.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const props = { user: state.user };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {};
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(RandomCustomContent);
