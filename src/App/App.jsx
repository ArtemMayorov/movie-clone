import React, { Component } from 'react'

import NoInternetConnection from '../services/NoInternetConnection';
import './App.css'
import FilmServece from '../services/servece';
import SearchPage from '../SearchPage/SearchPage';
import MainHeader from '../MainHeader/MainHeader';
import RatedPage from '../RatedPage/RatedPage';


export default class App extends Component {

  filmServece = new FilmServece();
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
    };
    constructor(){
      super();
    };
    componentDidMount(){
      this.getFilmList();
    }

    onError = (err) => {
      console.log('err',err);
        this.setState({
            error: true,
            loading: false,
        })
    };

    addAverange = (id, average) => {
      this.setState(() =>{
      return {
        dataAverage:[...this.state.dataAverage, {[id]: average}]
      }})
      localStorage.setItem('dataAverage', JSON.stringify(this.state.dataAverage))
    }

     getFilmList = async(filmName = 'return', page = 1)=>{
        this.setState({
          loadingList:true
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
    };
    getSelectedPage =(page)=>{
      this.setState(()=>{
        return {selectedPage: page}
      })
      console.log(this.state.selectedPage);
    }
  
  render() {
    const page = this.state.selectedPage === 'search'? 
    <SearchPage 
    getFimList = { this.getFilmList}
    addAverange = {this.addAverange}
    options={this.state}/> 
    : <RatedPage
    options={this.state}
    />

    return (
      <section className="container">
        <MainHeader
        getSelectedPage = {this.getSelectedPage}
        />
        <NoInternetConnection />
        {page}
      </section>
    );
  }
}