import React, { Component } from 'react'
import { includes,  uniqBy, merge,mergeWith } from "lodash" 
import NoInternetConnection from '../services/NoInternetConnection';
import './App.css'
import FilmServece from '../services/servece';
import SearchPage from '../SearchPage/SearchPage';
import MainHeader from '../MainHeader/MainHeader';
import RatedPage from '../RatedPage/RatedPage';


export default class App extends Component {

  filmServece = new FilmServece();
    state = {
        filmList: null,
        loading: true,
        loadingList: false,
        error: false,
        filmListPage: null,
        totalFilmsPage: null,
        totalFilms: null,
        dataAverage:[],
        selectedPage: 'search',
    };
    constructor(){
      super();
    };
    componentDidMount(){
      this.getFilmList();
    }

    onError = (err) => {
      console.log('err',err);
        this.setState({
            error: true,
            loading: false,
        })
    };

    addAverange = (film, average) => {
      let userAverage = 0;
      if(userAverage !== average){
        userAverage = average
      };
      this.setState(() =>{
      return {
        dataAverage:[...this.state.dataAverage,{ ...film, userAverage}]
      }
    })
      console.log('dataAverage', this.state.dataAverage);

      localStorage.setItem('dataAverage', JSON.stringify(uniqBy([ ...this.state.dataAverage,{ ...film, userAverage} ], 'id')))
    }


    // addAverange = (film, average) => {
      
    //   if()

    //   let userAverage = 0;
    //   if(userAverage !== average){
    //     userAverage = average;
    //   }
    //   this.setState(() =>{
    //   return {
    //     dataAverage:[{ ...film, userAverage}]
    //     // dataAverage:[ ...this.state.dataAverage, film]
    //   }})
    //   console.log('dataAverage', this.state.dataAverage);
    //   localStorage.setItem('dataAverage', JSON.stringify([ { ...film, userAverage} ]))
    // }

     getFilmList = async(filmName = 'return', page = 1)=>{
        this.setState({
          loadingList:true
        })
        await this.filmServece.getFilms(filmName, page)
        .then(filmsCollection => {
      
            this.setState({
                // filmList: test, 
                filmList: filmsCollection.results, 
                filmListPage: filmsCollection.page,
                totalFilmsPage: filmsCollection.total_pages,
                totalFilms: filmsCollection.total_results,
                loading:false,
                loadingList:false,
            })
        }).catch(this.onError)
    };
    getSelectedPage =(page)=>{
      this.setState(()=>{
        return {selectedPage: page}
      })
    }
  
  render() {
    const page = this.state.selectedPage === 'search'? 
    <SearchPage 
    getFimList = { this.getFilmList}
    addAverange = {this.addAverange}
    options={this.state}/> 
    : <RatedPage
    options={this.state}
    />

    return (
      <section className="container">
        <MainHeader
        getSelectedPage = {this.getSelectedPage}
        />
        <NoInternetConnection />
        {page}
      </section>
    );
  }
}


// addAverange = (film, average) => {
//   let userAverage = 0;
//   if(userAverage !== average){
//     userAverage = average
//   };

//   if(this.state.dataAverage.length !== 0) {
//     this.setState({
//       dataAverage:[],
//     })
//    const res = this.state.dataAverage.map(lastFilm => {

//       if(lastFilm.id === film.id) {
//         console.log('1');
//         if(lastFilm.userAverage !== userAverage){
//           console.log('2');
//           return {...lastFilm, userAverage}
//         }
//         console.log('3');
//         return {...lastFilm}
//       }
//       console.log('4');

//       return {...film, userAverage};

//     })
//     console.log('res', res);
    
//     this.setState(() =>{
//       return {
//         dataAverage:[...this.state.dataAverage,...res]
//       }
//     })
    
//   }else{
//     this.setState(() =>{
//       return {
//         dataAverage:[...this.state.dataAverage,{...film, userAverage}]
//       }
//     })
//   }

// //   this.setState(() =>{
// //   return {
// //     dataAverage:[...this.state.dataAverage,{ ...film, userAverage}]
// //   }
// // })
  

//   console.log('dataAverage', this.state.dataAverage);

//   localStorage.setItem('dataAverage', JSON.stringify([ ...this.state.dataAverage,{ ...film, userAverage} ]))
// }
// addAverange = (film, average) => {
  
//   if()

//   let userAverage = 0;
//   if(userAverage !== average){
//     userAverage = average;
//   }
//   this.setState(() =>{
//   return {
//     dataAverage:[{ ...film, userAverage}]
//     // dataAverage:[ ...this.state.dataAverage, film]
//   }})
//   console.log('dataAverage', this.state.dataAverage);
//   localStorage.setItem('dataAverage', JSON.stringify([ { ...film, userAverage} ]))
// }