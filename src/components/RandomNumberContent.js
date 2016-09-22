import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './randomnumbercontent.cssmodule.css';

import Card from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';

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
class RandomNumberContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      from: 0,
      to: 100,
      count: 1,
      isRepeated: false,
      result: []
    };
    this.handleRandom = this.handleRandom.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.handleCountChange = this.handleCountChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleRandom() {
    this.handleOpen();
    let rand = [];
    rand = randomFromRange(this.state.from, this.state.to, this.state.count, this.state.isRepeated);
    this.setState({result: rand});
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  handleFromChange(event) {
    this.setState({from: event.target.value});
  }

  handleToChange(event) {
    this.setState({to: event.target.value});
  }

  handleCountChange(event) {
    let count = event.target.value;
    const { from, to, isRepeated } = this.state;
    if (!isRepeated) {
      const range = to - from + 1;
      count = this.handleValueInRange(count, 0, range);
    }
    this.setState({count});
  }

  handleValueInRange(value, least, range) {
    let result = value;
    if (result > range) {
      result = range;
    } else if (result < least) {
      result = least;
    }
    return result;
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
        onRequestClose={this.handleClose}
      >
        <br />
        {dialogContent}
      </Dialog>
    );

    return (
      <div className="randomnumbercontent-component" styleName="randomnumbercontent-component">
        <Card>
          <TextField
            hintText="Please Input Number"
            floatingLabelText="From"
            defaultValue={this.state.from}
            type="number"
            onChange={this.handleFromChange}
          />
          <br />
          <TextField
            hintText="Please Input Number"
            floatingLabelText="To"
            defaultValue={this.state.to}
            type="number"
            onChange={this.handleToChange}
          />
          <br />
          <TextField
            hintText="Please Input Number"
            floatingLabelText="Count"
            value={this.state.count}
            type="number"
            onChange={this.handleCountChange}
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

RandomNumberContent.displayName = 'RandomNumberContent';
RandomNumberContent.propTypes = {};
RandomNumberContent.defaultProps = {};

export default RandomNumberContent;
