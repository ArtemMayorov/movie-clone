import React, { Component } from 'react'

import NoInternetConnection from '../services/NoInternetConnection';
import './App.css'
import FilmServece from '../services/servece';
import SearchPage from '../SearchPage/SearchPage';
import MainHeader from '../MainHeader/MainHeader';
import { debounce } from "lodash"


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

      updateText = (newSearchText, page) =>{
      if(newSearchText.trim() === '') return;
      this.getFilmList(newSearchText, page)
    }
    debouncedUpdateText = debounce(this.updateText, 2000)

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

  render() {
    return (
      <section className="container">
        <MainHeader/>
        <NoInternetConnection />
        <SearchPage 
      updateText ={this.debouncedUpdateText}
      options={this.state}/> 
      </section>
    );
  }
}