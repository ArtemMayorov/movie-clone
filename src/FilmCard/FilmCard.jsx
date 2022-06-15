import React, { Component } from 'react'
import 'antd/dist/antd.css';
import './FilmCard.css'
import {Col, Row, Typography, Tag, Rate, Image} from 'antd'
import { format } from 'date-fns'
import FilmServece from '../services/servece';
import { id } from 'date-fns/locale';


export default class FilmCard extends Component {
    constructor(props){
        super();
    };
    filmServece = new FilmServece();
    state = {
        srcForImg: '#',
        title: 'loading',
        average: 0,
        userAverage:0,
        data: null,
        text: '',
        key: 1,
    };
    
    componentDidMount() {
        const {original_title, vote_average, release_date, overview, id, backdrop_path, userAverage } = this.props.filmProps;
        this.idFilm = id
        
        this.setState({
            srcForImg: this.filmServece.getImage(backdrop_path),
            title: original_title,
            average: vote_average,
            data: release_date,
            text: overview,
            key: id,
            userAverage
        })
    }
      
    render() {
    const {Title, Paragraph} = Typography    

    const handleChange = (userAverage)=>{
        this.setState(()=>{
            return {userAverage}
        });
    this.props.addAverange(this.props.filmProps, userAverage)
    };

    const formatTime = (releaseDate ) => {
        if(!releaseDate) releaseDate = '0000-00-00'
        const dateArguments = releaseDate.split('-')
        const [y , m , d ] = dateArguments;
        return format(new Date(y, m, d), 'MMMM d, Y');
    };

    const formatText = (textForCard, section ) => {
        if(!textForCard) textForCard = 'No description';
        let clippedText = textForCard;
        if(textForCard.length >= 53){
             clippedText = textForCard.split(' ')
            if(section === 'title'){
             clippedText = clippedText.slice(0, 9)
           }else if(section === 'description') {
             clippedText = clippedText.slice(0, 20)
         }      
            clippedText = clippedText.join(' ');
            clippedText = `${clippedText} ...`;
        }
        return clippedText;
    };
    const ratedCards = this.filmServece.getRatedMovies();

    const res = ratedCards.filter(elem => {
        console.log('elem.id', elem.id)
        console.log('this.state.key',this.state.key)
        return elem.id === this.state.key
    });

    console.log('res', res)
   const aver = res.length > 0 ? res[0]["userAverage"] : 0;
    
    return (
      <div key={this.state.id} className='film-card'>
          <Row className='card-container'>
               <Col>
                   <img className='card-image' src={this.state.srcForImg} alt="testImage" />
               </Col> 
              <Col className='card-container-body'>
              <Typography className='card-typography'>
                  <Title level={5} className='card-title'>{formatText(this.state.title, 'title')}</Title>
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
                      {formatText(this.state.text, 'description')}
                  </span>
              </Paragraph>
              {/* <Rate className = 'card-stars' key={this.state.average} count ={10} disabled ={true} allowHalf defaultValue = {this.state.average}/> */}
              <Rate 
               className = 'card-stars'
                
               key={this.state.key} count ={10}
                allowHalf
                defaultValue = {aver}
                onChange = {handleChange}
                />
              </Col>
          </Row>
      </div>
    )
  }
}
