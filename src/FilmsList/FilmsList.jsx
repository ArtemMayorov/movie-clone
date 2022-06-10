import React, { Component } from 'react'
import {Col, Row, Spin, Alert} from 'antd'
import FilmCard from '../FilmCard/FilmCard'
import 'antd/dist/antd.css';
import './FilmsList.css'

export default class FilmsList extends Component {
    constructor(props){
        super()
    }
  
    render() {
        const {options:{ loading, error, filmList }} = this.props
        console.log('error', error);
        if(loading) {
            return(
                <Spin size="large" className = "spin"/>
            )
        }
        if(error) {
            return(
                <Alert
                message="Oops..."
                description="Something went wrong :("
                type="error"
              />
            )
        }
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
 
