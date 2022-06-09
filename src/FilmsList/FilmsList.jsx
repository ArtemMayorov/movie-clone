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
      console.log('render_FilmList', this.state.baseImageUrl );
    return (
      <Row className ='grid-container'>
          <Col>
              <FilmCard filmProps = {this.state}/>
          </Col>
          <Col>
              Рандомный текст 2  
          </Col>
          <Col>
              Рандомный текст 3
          </Col>
          <Col>
              Рандомный текст 4  
          </Col>
          <Col>
              Рандомный текст 5
          </Col>
          <Col>
              Рандомный текст 6  
          </Col>
        </Row>
    )
  }
}
