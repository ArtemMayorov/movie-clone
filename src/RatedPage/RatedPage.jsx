import React, { Component } from 'react'
import FilmsList from '../FilmsList/FilmsList'
import FilmServece from '../services/servece';
import {Empty} from 'antd'
import { uniqBy } from "lodash"

export default class RatedPage extends Component {
    filmServece = new FilmServece();
    
  render() {
    const {options} = this.props;
    // localStorage.clear()
    const filmList = this.filmServece.getRatedMovies();
    // const filmList = _.uniqBy(this.filmServece.getRatedMovies(), 'id');
    console.log('lisssst', filmList);
    console.log('test', _.uniqBy(filmList,"id") )
    // console.log('options', options);
    if(!filmList){
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
      <FilmsList
      filmList = {filmList}
      />
    )
  }
}
