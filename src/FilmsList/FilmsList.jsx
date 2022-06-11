import React, { Component } from 'react'
import {Col, Row} from 'antd'
import FilmCard from '../FilmCard/FilmCard'
import 'antd/dist/antd.css';
import './FilmsList.css'

export default class FilmsList extends Component {
    constructor(props){
        super()
    }
    render() {
        const { filmList } = this.props.options;
        
        const filmCard = filmList.map((film)=>{
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
 
