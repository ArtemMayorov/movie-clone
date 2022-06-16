import React, { Component } from 'react'
import 'antd/dist/antd.css';
import './SearchInput.css'
import { Input } from 'antd';
export default class SearchInput extends Component {
  state = {
    searchValue: '',
  };
  getInputValue(text) {
    this.setState({
      searchValue: text,
    });
  }
  handleChange() {
    this.props.updateText(this.state.searchValue);
  }

  render() {
    return (
      <Input
        onKeyUp={() => this.handleChange()}
        onChange={(e) => this.getInputValue(e.target.value)}
        value={this.state.searchValue}
        placeholder="Type to search..."
        maxLength={50}
      />
    )
  }
}
