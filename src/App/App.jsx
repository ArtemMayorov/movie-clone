import React, { Component } from 'react'

import FilmsList from '../FilmsList/FilmsList';
import './App.css'

export default class App extends Component {
  render() {
    return (
      <section className="container">
        <FilmsList />
      </section>
    );
  }
}
