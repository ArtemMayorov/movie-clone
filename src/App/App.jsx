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
    };
    constructor(){
      super();
      console.log(this);
      
    };
    componentDidMount(){
      this.getFilmList();
    }
    componentDidUpdate(prevProps){
      if(this.state.filmList !== prevProps.filmList){
      }
    }
    onError = (err) => {
      console.log('err',err);
        this.setState({
            error: true,
            loading: false,
        })
    };
    
    updateText = (newSearchText) =>{
      console.log('newSearchText', newSearchText);
      if(newSearchText.trim() === '') return;
      this.getFilmList(newSearchText, 1)
    }
    debouncedUpdateText = debounce(this.updateText, 2000)

     getFilmList = async(filmName = 'return', page = 1)=>{
        this.setState({
          loadingList:true
        })
        await this.filmServece.getFilms(filmName, page)
        .then(filmsCollection => {
            this.setState({
                filmList: filmsCollection, 
                loading:false,
                loadingList:false
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
