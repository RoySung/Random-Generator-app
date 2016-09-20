import React, { PropTypes } from 'react';
import cssmodules from 'react-css-modules';
import styles from './randomcustomcontent.cssmodule.css';

import Card from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import { yellow500 } from 'material-ui/styles/colors';

import { Item } from '../actions/item';

function processRange(start, end) {
  const range = {};
  for (let i = start; i <= end; i++) {
    range[i] = true;
  }
  return range;
}

function randomFromRange(start, end, count, isRepeated) {
  let rand = 0;
  let range = [];
  const result = [];
  range = processRange(start, end);
  while (result.length < count) {
    rand = Math.floor(Math.random() * (end - start + 1) + start);
    if (range[rand]) {
      result.push(rand);
      if (!isRepeated) range[rand] = false;
    }
  }
  result.sort((a, b) => a - b);
  return result;
}

@cssmodules(styles)
class RandomCustomContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openResult: false,
      openSave: false,
      items: ['default0', 'default1'],
      count: 1,
      isRepeated: false,
      result: [],
      key: null,
      isSaved: false,
      title: 'default'
    };
    this.handleRandom = this.handleRandom.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleOpenResult = this.handleOpenResult.bind(this);
    this.handleOpenSave = this.handleOpenSave.bind(this);
    this.handleCloseResult = this.handleCloseResult.bind(this);
    this.handleCloseSave = this.handleCloseSave.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleRandom() {
    this.handleOpenResult();
    let rand = [];
    let result = [];
    rand = randomFromRange(0, this.state.items.length - 1, this.state.count, this.state.isRepeated);
    result = rand.map((value) => (
      this.state.items[value]
    ));
    this.setState({result});
  }

  handleAdd() {
    const items = this.state.items;
    const value = `default${items.length}`;
    items.push(value);
    this.setState({items});
  }

  handleOpenResult() {
    this.setState({openResult: true});
  }

  handleOpenSave() {
    const isSaved = !this.state.isSaved;
    if (isSaved) {
      this.setState({openSave: true});
    } else {
      const { user } = this.props;
      const item = new Item(user.uid);
      const key = this.state.key;
      item.removeItem(key);
      this.setState({
        isSaved
      });
    }
  }

  handleCloseResult() {
    this.setState({openResult: false});
  }

  handleCloseSave() {
    this.setState({openSave: false});
  }

  handleInputChange(event) {
    const obj = {};
    const id = event.target.id;
    const value = event.target.value;
    const regexResult = id.match(/item(.+)/);
    if (regexResult) {
      obj.items = this.state.items;
      obj.items[regexResult[1]] = value;
    } else {
      obj[id] = value;
    }
    this.setState(obj);
  }

  handleCheck(event, isInputChecked) {
    this.setState({isRepeated: isInputChecked});
  }

  handleSave() {
    const isSaved = !this.state.isSaved;
    const { user } = this.props;
    const item = new Item(user.uid);
    let key = this.state.key;
    if (isSaved) {
      key = item.pushItem(this.state.title, this.state.items);
      this.setState({
        isSaved,
        key,
        openSave: false
      });
    }
  }

  render() {
    const actionsResult = [
      <FlatButton
        label="Ok"
        primary
        keyboardFocused
        onTouchTap={this.handleCloseResult}
      />,
    ];

    const actionsSave = [
      <FlatButton
        label="Save"
        primary
        keyboardFocused
        onTouchTap={this.handleSave}
      />,
    ];

    const dialogRow = this.state.result.map((value) => (
      <div>
        {value}
        <Divider />
      </div>
    ));

    const dialogContent = (
      <div styleName="dialogContent">
        {dialogRow}
      </div>
    );

    const resultDialog = (
      <Dialog
        title="Result"
        actions={actionsResult}
        modal={false}
        autoScrollBodyContent
        open={this.state.openResult}
      >
        <br />
        {dialogContent}
      </Dialog>
    );
    const saveDialog = (
      <Dialog
        title="Save"
        actions={actionsSave}
        modal={false}
        autoScrollBodyContent
        open={this.state.openSave}
      >
        <TextField
          hintText="Please Input Text"
          type="text"
          floatingLabelText="Title"
          id="title"
          defaultValue={this.state.title}
          onChange={this.handleInputChange}
        />
      </Dialog>
    );

    const items = this.state.items.map((value, index) => (
      <div key={`item${index}`}>
        <TextField
          hintText="Please Input Text"
          type="text"
          id={`item${index}`}
          floatingLabelText={index.toString()}
          defaultValue={value}
          onChange={this.handleInputChange}
        />
        <br />
      </div>
    ));
    let color = null;
    if (this.state.isSaved) {
      color = yellow500;
    }
    return (
      <div className="randomcustomcontent-component" styleName="randomcustomcontent-component">
        <Card>
          <IconButton
            styleName="largeIconButton"
            onTouchTap={this.handleOpenSave}
          >
            <ActionGrade color={color} styleName="largeIcon" />
          </IconButton>
          <FloatingActionButton
            styleName="addButton"
            onTouchTap={this.handleAdd}
          >
            <ContentAdd />
          </FloatingActionButton>
          <br /><br /><br /><br />
          {items}
          <TextField
            hintText="Please Input Number"
            floatingLabelText="Count"
            id="count"
            type="number"
            defaultValue={this.state.count}
            onChange={this.handleInputChange}
          />
          <br /><br />
          <Checkbox
            label="Repeated"
            styleName="checkbox"
            defaultChecked={this.state.isRepeated}
            onCheck={this.handleCheck}
          />
          <br />
          <RaisedButton
            label="Random"
            styleName="button"
            primary
            onTouchTap={this.handleRandom}
          />
        </Card>
        {resultDialog}
        {saveDialog}
      </div>
    );
  }
}

RandomCustomContent.displayName = 'RandomCustomContent';
RandomCustomContent.propTypes = {
  user: PropTypes.object.isRequired
};
RandomCustomContent.defaultProps = {};

export default RandomCustomContent;
