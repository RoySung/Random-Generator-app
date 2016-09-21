import React, { PropTypes } from 'react';
import cssmodules from 'react-css-modules';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import AddBox from 'material-ui/svg-icons/content/add-box';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router';
import { cyan500, yellow500 } from 'material-ui/styles/colors';
import { Items } from '../actions/item';
import styles from './randomcustomlist.cssmodule.css';

@cssmodules(styles)
class RandomCustomList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.getItems(props).then((items) => {
      this.setState({items});
    });
  }

  componentWillReceiveProps(nextProps) {
    this.getItems(nextProps).then((items) => {
      this.setState({items});
    });
  }

  getItems(props) {
    return new Promise((resolve, reject) => {
      const { user } = props;
      const itemsClass = new Items(user.uid);
      const getItemsRef = itemsClass.getItemsRef();
      getItemsRef.on('value', (snapshot) => {
        const result = snapshot.val();
        if (result) {
          const items = [];
          Object.keys(result).forEach((key) => {
            const item = {};
            item.key = key;
            item.title = result[key].title;
            item.value = result[key].value;
            items.push(item);
          });
          resolve(items);
        }
      });
    });
  }

  render() {
    let listItems = this.state.items.map((item) => (
      <div key={item.key}>
        <ListItem
          leftAvatar={<Avatar icon={<ActionAssignment />}backgroundColor={cyan500} />}
          primaryText={item.title}
          containerElement={
            <Link to={{ pathname: '/custom', query: {item: JSON.stringify(item)} }} />
          }
        />
        <Divider inset />
      </div>

    ));
    return (
      <div className="randomcustomlist-component" styleName="randomcustomlist-component">
        <List>
          {listItems}
          <ListItem
            leftAvatar={<Avatar icon={<AddBox />}backgroundColor={yellow500} />}
            primaryText="＋New"
            containerElement={<Link to={{ pathname: '/custom', query: {item: ''} }} />}
          />
          <Divider inset />
        </List>
      </div>
    );
  }
}

RandomCustomList.displayName = 'RandomCustomList';
RandomCustomList.propTypes = {
  user: PropTypes.object.isRequired
};
RandomCustomList.defaultProps = {};

export default RandomCustomList;
