import React, { Component } from 'react'
import FilmsList from '../FilmsList/FilmsList'

export default class SearchPage extends Component {
    constructor(){
        super();
    };

  render() {
    const {options} = this.props;
    return (
    <FilmsList options={options}/>
    )
  }
}
