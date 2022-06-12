import React, { Component } from 'react'
import { Menu } from 'antd';
import 'antd/dist/antd.css';
import './MainHeader.css'

export default class MainHeader extends Component {
  state ={
    selectedPage: 'search'
  }
  handleSelect = (page)=>{
    this.setState(()=> {
    return {selectedPage: page.key}
    })
    this.props.getSelectedPage(page.key);
  }
  render() {

    return (
      <Menu 
      selectedKeys={[this.state.selectedPage]}
       inlineIndent={0}
        className = 'menu-container'
        mode="horizontal"
        onSelect = {this.handleSelect}
          >
      <Menu.Item key='search' className = 'menu-item ' >Search</Menu.Item>
      <Menu.Item key= 'rated' className = 'menu-item' >Rated</Menu.Item>
      </Menu>
    )
  }
}
