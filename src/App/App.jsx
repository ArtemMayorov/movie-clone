import React, { Component } from 'react'

import FilmsList from '../FilmsList/FilmsList';
import NoInternetConnection from '../services/NoInternetConnection';
import './App.css'

export default class App extends Component {
  render() {
    return (
      <section className="container">
        <NoInternetConnection/>
        <FilmsList />
      </section>
    );
  }
}
