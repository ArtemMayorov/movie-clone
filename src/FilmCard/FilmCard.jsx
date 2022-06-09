import React, { Component } from 'react'
import './FilmCard.css'
import {Col, Row, Typography, Tag} from 'antd'
import { format } from 'date-fns'



const testObj = {adult: false,
backdrop_path: "/4QLdZ2A8mkDWp2rpfgDrwmeCtUW.jpg",
genre_ids: [28, 12, 80],
id: 47971,
original_language: "en",
original_title: "xXx: Return of Xander Cage",
overview: "Extreme athlete turned government operative Xander Cage comes out of self-imposed exile, thought to be long dead, and is set on a collision course with deadly alpha warrior Xiang and his team in a race to recover a sinister and seemingly unstoppable weapon known as Pandora's Box. Recruiting an all-new group of thrill-seeking cohorts, Xander finds himself enmeshed in a deadly conspiracy that points to collusion at the highest levels of world governments.",
popularity: 178.37,
poster_path: "/hba8zREJpP1AYhaXgb2oJLQeO0K.jpg",
release_date: "2017-01-13",
title: "xXx: Return of Xander Cage",
video: false,
vote_average: 5.9,
vote_count: 5905
}

export default class FilmCard extends Component {
    constructor(props){
        super();
    };
    render() {
    const {filmProps} = this.props
    const {Title, Paragraph} = Typography
    const testStr = 'A former basketball all-star, who has lost  wife and family foundation in a struggle with addiction attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high'
    const formatTime = (releaseDate) => {
        const dateArguments = releaseDate.split('-')
        const [y , m , d ] = dateArguments;
        return format(new Date(y, m, d), 'MMMM d, Y');
    };
    const formatText = (textForCard = 'No description :(') => {
        let clippedText = textForCard;
        if(textForCard.length >= 204){
            clippedText = clippedText
            .split(' ')
            .slice(0, 34)
            .join(' ');
            clippedText = `${clippedText} ...`;
        };
        return clippedText;
    };

    
    return (
      <div className='film-card'>
          <Row className='card-container'>
             {filmProps.baseImageUrl ? 
               <Col>
               <img className='card-image' src={`${filmProps.baseImageUrl}w500${filmProps.filmList[0].backdrop_path}`} alt="testImage" /></Col> 
               : <Col><img src='#' alt="testImage"/></Col>}

              <Col className='card-container-body'>
              <Typography className='card-typography'>
              <Title className='card-title'>{testObj.original_title}</Title>
              <div className='card-average'><span className='card-average-text'>{testObj.vote_average}</span></div>
              </Typography>
              <div className='card-date'>{formatTime(testObj.release_date)}</div>
              <Tag className='card-genre'><span className='card-genre-text'>Action</span></Tag>
              <Tag className='card-genre'><span className='card-genre-text'>Drama</span></Tag>
              <Paragraph className= 'card-description'><span className='card-description-text'>{formatText(testObj.overview)}</span></Paragraph>
              </Col>
          </Row>
      </div>
    )
  }
}
