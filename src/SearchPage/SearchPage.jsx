import React, { Component } from 'react'
import { debounce } from 'lodash'
import { Spin, Alert, Pagination, Empty } from 'antd'

import FilmsList from '../FilmsList/FilmsList';
import SearchInput from '../SearchInput/SearchInput'
import 'antd/dist/antd.css';

export default class SearchPage extends Component {

  state = {
    searchText: 'return',
    page: 1,
  };

  handleChange = (page) => {
    console.log('handleChange');
    this.updatePage(this.state.searchText, page)
    
  };

  handleInput = (newSearchText) => {
    console.log('handleInput');
    if (newSearchText.trim() === '') return;
      this.setState({
        searchText: newSearchText,
        page: 1,
      });
      this.props.setSearchText(newSearchText)
      return this.props.getFimList(newSearchText, 1);
  };

  updatePage = (page) => {

    this.props.getFimList(this.state.searchText, page);    
    this.setState({
      page
    });
    };


    

  // updatePage = (newSearchText, page) => {
  //   console.log('updatePage');
  //   this.setState(()=> {
  //   return {
  //     page
  //   }
  //   });
  //   console.log('newSearchText', newSearchText);
  //   if (newSearchText.trim() === '') return;
  //   if (newSearchText !== this.state.searchText) {
  //     this.setState({
  //       searchText: newSearchText,
  //       page: 1,
  //     });
  //     return this.props.getFimList(newSearchText, 1);
  //   }
  //   console.log('this.state.page', this.state.page)
  //   this.props.getFimList(this.state.searchText, page);
    
  // };

  debouncedUpdatePage = debounce(this.updatePage, 2000);
  debouncedHandleInput = debounce(this.handleInput, 2000);

  render() {
    console.log('state', this.state)
    const {
      addAverange,
      options: { loading, error, filmList, loadingList, totalFilmsPage, totalFilms, filmListPage,selectedPageNumber },
    } = this.props;

    if (loading) {
      return <Spin size="large" className="spin" />;
    }
    if (error) {
      return <Alert message="Oops..." description="Something went wrong :(" type="error" />;
    }

    const filmNotFound =
      filmList.length === 0 && !loadingList ? (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            margin: 40,
            height: 60,
          }}
          description={<span>Movies not found</span>}
        />
      ) : null;
          console.log('selectedPageNumberProps', this.props);
    const loadList = loadingList ? (
      <Spin size="large" className="spin" />
    ) : (
      <React.Fragment>
        <FilmsList
          // options={options}
          filmList={filmList}
          addAverange={addAverange}
        />
        <Pagination
          total={totalFilms}
          onChange={this.updatePage}
          showSizeChanger={false}
          defaultCurrent={this.props.options.selectedPageNumber}
          // defaultCurrent={this.state.page}
          defaultPageSize={20}
        />
      </React.Fragment>
    )
    const films = !filmNotFound ? loadList : null;
    return (
      <React.Fragment>
        <SearchInput updateText={this.debouncedHandleInput} />
        {filmNotFound}
        {films}
      </React.Fragment>
    )
  }
}
