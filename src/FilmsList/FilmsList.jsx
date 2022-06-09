import React, { Component } from 'react'
import {Col, Row} from 'antd'
import FilmCard from '../FilmCard/FilmCard'
import './FilmsList.css'
import FilmServece from '../services/servece';

export default class FilmsList extends Component {
   
    filmServece = new FilmServece();

    state = {
        filmList: null,
        baseImageUrl: null,
    };

    constructor(){
      super();
        this.getFilmList();
    };
  
       async getFilmList(){
        await this.filmServece.getFilms('return', 1)
        .then(filmsCollection => {
            this.setState({
                filmList: filmsCollection  
            })
        })
        await this.filmServece.getConfig()
        .then(configImage => {
            this.setState({
                baseImageUrl: configImage.secure_base_url  
            })
        })
    };

  render() {
      console.log(this.state);
      if(this.state.filmList){

        const filmCard = this.state.filmList.map((film)=>{
            return (
            <Col>
                <FilmCard 
                filmProps = {film}
                baseImageUrl = {this.state.baseImageUrl}
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
 
