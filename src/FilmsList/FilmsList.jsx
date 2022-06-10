import React, { Component } from 'react'
import {Col, Row, Spin, Alert} from 'antd'
import FilmCard from '../FilmCard/FilmCard'
import 'antd/dist/antd.css';
import './FilmsList.css'
import FilmServece from '../services/servece';

export default class FilmsList extends Component {
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
        if(this.state.loading) {
            return(
                <Spin size="large" className = "spin"/>
            )
        }
        if(this.state.error) {
            return(
                <Alert
                message="Oops..."
                description="Something went wrong :("
                type="error"
              />
            )
        }
          const filmCard = this.state.filmList.map((film)=>{
              return (
              <Col key={film.id}>
                  <FilmCard 
                  filmProps = {film}
                  />
              </Col>
          )
        });

        return (
          <Row className ='grid-container'>
             {filmCard}
            </Row>
        )
      
    }
}
 
