import React, { Component } from 'react'
import 'antd/dist/antd.css';
import './FilmCard.css'
import {Col, Row, Typography, Tag, Rate, Image} from 'antd'
import { format } from 'date-fns'


export default class FilmCard extends Component {
    constructor(props){
        super();
    };

    state = {
        srcForImg: '#',
        title: 'loading',
        average: 0,
        data: null,
        text: '',
        key: 1
    };

    componentDidMount() {
        this.setState({
            srcForImg: `https://image.tmdb.org/t/p/w500${this.props.filmProps.backdrop_path}`,
            title: this.props.filmProps.original_title,
            average: this.props.filmProps.vote_average,
            data: this.props.filmProps.release_date,
            text: this.props.filmProps.overview,
            key: this.props.filmProps.id
        })
    }
    render() {
    const {Title, Paragraph} = Typography    
    
    const formatTime = (releaseDate ) => {
        if(!releaseDate) releaseDate = '0000-00-00'
        // if(releaseDate === undefined) releaseDate = '0000-00-00'
        const dateArguments = releaseDate.split('-')
        const [y , m , d ] = dateArguments;
        return format(new Date(y, m, d), 'MMMM d, Y');
    };

    const formatText = (textForCard) => {
        
        if(!textForCard) textForCard = 'No description';
  
        let clippedText = textForCard;
        if(textForCard.length >= 156){
            clippedText = textForCard
            .split(' ')
            .slice(0, 20)
            .join(' ');
            clippedText = `${clippedText} ...`;
        };
        return clippedText;
    };

    return (
      <div key={this.state.id} className='film-card'>
          <Row className='card-container'>
               <Col>
                   <img  className='card-image' src={this.state.srcForImg} alt="testImage" />
               </Col> 

              <Col className='card-container-body'>
              <Typography className='card-typography'>
                  <Title level={5} className='card-title'>{this.state.title}</Title>
                  <div className='card-average'><span className='card-average-text'>{this.state.average}</span></div>
              </Typography>
              <div className='card-date'>{formatTime(this.state.data)}</div>
              <Tag className='card-genre'>
                  <span className='card-genre-text'>Action</span>
              </Tag>
              <Tag className='card-genre'>
                  <span className='card-genre-text'>Drama</span>
              </Tag>
              <Paragraph className= 'card-description'>
                  <span className='card-description-text'>
                      {formatText(this.state.text)}
                  </span>
              </Paragraph>
              <Rate className = 'card-stars' key={this.state.average} count ={10} disabled ={true} allowHalf defaultValue = {this.state.average}/>
              </Col>
          </Row>
      </div>
    )
  }
}
