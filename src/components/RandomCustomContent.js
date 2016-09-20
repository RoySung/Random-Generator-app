import React from 'react';
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
      open: false,
      items: ['default0', 'default1'],
      count: 1,
      isRepeated: false,
      result: []
    };
    this.handleRandom = this.handleRandom.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleRandom() {
    this.handleOpen();
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

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
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
  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary
        keyboardFocused
        onTouchTap={this.handleClose}
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

    const dialog = (
      <Dialog
        title="Result"
        actions={actions}
        modal={false}
        autoScrollBodyContent
        open={this.state.open}
        onRequestClose={this.handleAdd}
      >
        <br />
        {dialogContent}
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

    return (
      <div className="randomcustomcontent-component" styleName="randomcustomcontent-component">
        <Card>
          <FloatingActionButton
            styleName="addButton"
            onTouchTap={this.handleAdd}
          >
            <ContentAdd />
          </FloatingActionButton>
          <br /><br />
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
        {dialog}
      </div>
    );
  }
}

RandomCustomContent.displayName = 'RandomCustomContent';
RandomCustomContent.propTypes = {};
RandomCustomContent.defaultProps = {};

export default RandomCustomContent;
