import React, { Component } from 'react'

import FilmsList from '../FilmsList/FilmsList';
import NoInternetConnection from '../services/NoInternetConnection';
import './App.css'
import FilmServece from '../services/servece';
import SearchPage from '../SearchPage/SearchPage';
export default class App extends Component {

  filmServece = new FilmServece();
    state = {
        filmList: null,
        loading: true,
        error: false,
    };
    constructor(){
      super();
        this.getFilmList('max', 1);
    };
    onError = () => {
        this.setState({
            error: true,
            loading: false,
        })
    };
       async getFilmList(filmName = 'return', page = 1){
        await this.filmServece.getFilms(filmName, page)
        .then(filmsCollection => {
            this.setState({
                filmList: filmsCollection, 
                loading:false
            })
        }).catch(this.onError)
    };

  render() {
    console.log(this.state);
    return (
      <section className="container">
        <NoInternetConnection />
        <SearchPage options={this.state}/>
        {/* <FilmsList options={this.state} /> */}
      </section>
    );
  }
}
