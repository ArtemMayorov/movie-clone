import React, { Component } from 'react';
import { includes, uniqBy, merge, mergeWith } from 'lodash';
import NoInternetConnection from '../services/NoInternetConnection'
import './App.css';
import FilmServece from '../services/servece'
import SearchPage from '../SearchPage/SearchPage'
import MainHeader from '../MainHeader/MainHeader'
import RatedPage from '../RatedPage/RatedPage'


export default class App extends Component {
  constructor(props) {
    super()
  };
  filmServece = new FilmServece()
    state = {
    filmList: null,
    loading: true,
    loadingList: false,
    error: false,
    filmListPage: null,
    totalFilmsPage: null,
    totalFilms: null,
    dataAverage:[],
    selectedPage: 'search',
    selectedPageNumber: 1,
    searchText:'return'
  };

  componentDidMount(){
    this.getFilmList(this.state.searchText,this.state.selectedPageNumber)
    }

  setSearchText = (text) => {
    this.setState({
      searchText: text,
    });
  };

  componentDidUpdate(lastState, prevState){

      if(lastState.selectedPage == 'search' ){
      console.log('componentDidUpdate2')
        this.getFilmList(this.state.searchText,this.state.selectedPageNumber)
      }
  };

  onError = (err) => {
    console.log('err',err)
        this.setState({
      error: true,
      loading: false,
    })
  }

    addAverange = (film, average) => {
    let userAverage = 0
      if(userAverage !== average){
      userAverage = average
    };
    this.setState(() =>{
      return {
        dataAverage: [...this.state.dataAverage, { ...film, userAverage }],
      };
    });

    localStorage.setItem('dataAverage', JSON.stringify(uniqBy([ ...this.state.dataAverage,{ ...film, userAverage} ], 'id')))
  }

  getFilmList = async(filmName = 'return', page = 1)=>{
    this.setState({
      loadingList:true,
      selectedPageNumber: page
    })
    await this.filmServece.getFilms(filmName, page)
      .then(filmsCollection => {
        this.setState({
          filmList: filmsCollection.results, 
          filmListPage: filmsCollection.page,
          totalFilmsPage: filmsCollection.total_pages,
          totalFilms: filmsCollection.total_results,
          loading:false,
          loadingList:false,
        })
      }).catch(this.onError)
  }
    getSelectedPage =(page)=>{
    this.setState(()=>{
      return {selectedPage: page}
    })
  }

  render() {
    console.log('selectedPageNumber', this.state.selectedPageNumber);
    const page =
      this.state.selectedPage === 'search' ? 
      <SearchPage 
        setSearchText = {this.setSearchText} 
        getFimList = {this.getFilmList}
        addAverange = {this.addAverange}
        options={this.state}/> 
      : <RatedPage
        options={this.state}
      />
    return (
      <section className="container">
        <MainHeader getSelectedPage={this.getSelectedPage} />
        <NoInternetConnection />
        {page}
      </section>
    )
  }
}
