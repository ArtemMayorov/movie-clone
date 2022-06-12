import React, { Component } from 'react'
import FilmsList from '../FilmsList/FilmsList'
import FilmServece from '../services/servece';
import {Empty} from 'antd'


export default class RatedPage extends Component {
    filmServece = new FilmServece();
 
  render() {
    const {options} = this.props;
    // localStorage.clear()

    const ratedMovies = this.filmServece.getRatedMovies();
    
    if(!ratedMovies){
        return(
            <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              margin:40,
              height: 60,
            }}
            description={
              <span>
                Movies not found 
              </span>
            }/>
        )
    }
    return (
      <div>RatedPage</div>
    )
  }
}
