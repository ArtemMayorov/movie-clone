import React, { Component } from 'react'
import { debounce } from "lodash"
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
 
  
    handleChange = (page) => {
      this.updatePage(this.state.searchText, page)
    }
 
    updatePage = (newSearchText, page) =>{
      if(newSearchText.trim() === '') return;
      if(newSearchText !== this.state.searchText){
        this.setState({
          page:1
        })
      }
      this.props.getFimList(newSearchText, page);
        this.setState({
          searchText: newSearchText,
          page
        })
      }
    
    
    debouncedUpdateText = debounce(this.updatePage, 2000)

  render() {
    const { Title } = Typography;
    const { options:{ loading, error, filmList, loadingList,totalFilmsPage, totalFilms, filmListPage }} = this.props;
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
    defaultPageSize ={20}
    />
    </React.Fragment>

    return (
    <React.Fragment>
    <SearchInput 
    updateText={this.debouncedUpdateText}/>
    {loadList}
    {filmNotFound}
    </React.Fragment>
    )
  }
}