import React, { Component } from 'react'
import FilmsList from '../FilmsList/FilmsList'
import SearchInput from '../SearchInput/SearchInput';
import {Spin, Alert, Typography, Pagination} from 'antd'
export default class SearchPage extends Component {
    constructor(){
        super();
    };
 
  render() {
    const { Title } = Typography;
    const {updateText ,options:{ loading, error, filmList, loadingList }} = this.props;
    const {options} = this.props;

    console.log('filmList',filmList);

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
    <FilmsList options={options}/>;
    <Pagination
    current={5}
    total = {10}
    />;
    </React.Fragment>

    return (
    <React.Fragment>
    <SearchInput updateText={updateText}/>
    {loadList}
    {filmNotFound}
    </React.Fragment>
    )
  }
}
