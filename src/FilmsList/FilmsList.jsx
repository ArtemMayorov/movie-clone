import React, { Component } from 'react'
import {Col, Row} from 'antd'
import FilmCard from '../FilmCard/FilmCard'
import './FilmsList.css'
import FilmServece from '../services/servece';

export default class FilmsList extends Component {
    filmServece = new FilmServece();
    state = {
        filmList: null,
    };
    constructor(){
      super();
        this.getFilmList('max', 1);
    };
       async getFilmList(filmName = 'return', page = 1){
        await this.filmServece.getFilms(filmName, page)
        .then(filmsCollection => {
            this.setState({
                filmList: filmsCollection  
            })
        })
    };
  
    render() {
        if(this.state.filmList){
          const filmCard = this.state.filmList.map((film)=>{
              return (
              <Col key={film.id}>
                  <FilmCard 
                  filmProps = {film}
                  />
              </Col>
          )
        })
        return (
          <Row className ='grid-container'>
             {filmCard}
            </Row>
        )
      }
    }
}
 
