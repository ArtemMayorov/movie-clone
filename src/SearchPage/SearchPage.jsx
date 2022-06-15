import React, { Component } from 'react'
import { debounce } from "lodash"
import FilmsList from '../FilmsList/FilmsList'
import SearchInput from '../SearchInput/SearchInput';
import {Spin, Alert, Pagination, Empty} from 'antd'
import 'antd/dist/antd.css';

export default class SearchPage extends Component {
    constructor(){
        super();
    };
    state = {
      searchText:'',
      page: 1,
    }
    handleChange = (page) => {
      this.updatePage(this.state.searchText, page)
    }
 
    updatePage = (newSearchText, page) =>{
      if(newSearchText.trim() === '') return;
      if(newSearchText !== this.state.searchText){
        this.setState({
          searchText: newSearchText,
          page:1
        })
      }
      this.props.getFimList(newSearchText, page);
        this.setState({
          page
        })
      }
    
    debouncedUpdatePage = debounce(this.updatePage, 2000)

  render() {
    const {options} = this.props;
    const { addAverange ,options:{ loading, error, filmList, loadingList,totalFilmsPage, totalFilms, filmListPage }} = this.props;
    
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
                          && !loadingList ? 
                          <Empty
                          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                          imageStyle={{
                            margin:40,
                            height: 60,
                          }}
                          description={
                            <span>
                              Movies not found 
                            </span>
                          }/>
                           : null;

    const loadList = loadingList  ?  
    <Spin size="large" className = "spin"/> : 
    <React.Fragment>
    <FilmsList 
    // options={options}
    filmList={filmList}
    addAverange ={addAverange}
    />
    <Pagination
    total={totalFilms}
    onChange = {this.handleChange}
    showSizeChanger ={false}
    defaultCurrent={this.state.page}
    defaultPageSize = {20}
    />
    </React.Fragment>
    const films = !filmNotFound ? loadList: null;
    return (
    <React.Fragment>
    <SearchInput 
    updateText={this.debouncedUpdatePage}/>
    {filmNotFound}
    {films}
    </React.Fragment>
    )
  }
}