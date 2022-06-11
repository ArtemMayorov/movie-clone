import React, { Component } from 'react'

import FilmsList from '../FilmsList/FilmsList'
import SearchInput from '../SearchInput/SearchInput';
import {Spin, Alert, Typography, Pagination} from 'antd'
import 'antd/dist/antd.css';

export default class SearchPage extends Component {
    constructor(){
        super();
    };
    state = {
      searchText:'max',
      page: 1,
    }
    handleText = (text) => {
      this.setState({
        searchText: text,
        page: 1
      })
    }
  
    handleChange = (page) => {
      this.setState({
        page,
      })
      this.props.updateText(this.state.searchText, page)
    }
  render() {
    const { Title } = Typography;
    const {updateText ,options:{ loading, error, filmList, loadingList,totalFilmsPage, totalFilms, filmListPage }} = this.props;
    const {options} = this.props;
    if(loading) {
        return(
            <Spin size="large" className = "spin"/>
        )
    }
    if(error) {
        return(
            <Alert
            message="Oops..."
            description="Something went wrong :("
            type="error"
          />
        )
    };
 
    const filmNotFound = filmList.length === 0 
                          && !loadingList ? <Title>NotFound</Title> : null;
    const loadList = loadingList ?  
    <Spin size="large" className = "spin"/> : 
    <React.Fragment>
    <FilmsList options={options}/>
    <Pagination
    total={totalFilms}
    onChange = {this.handleChange}
    showSizeChanger ={false}
    defaultCurrent={this.state.page}
    />
    </React.Fragment>

    return (
    <React.Fragment>
    <SearchInput 
    handleText = {this.handleText}
    updateText={updateText}/>
    {loadList}
    {filmNotFound}
    </React.Fragment>
    )
  }
}