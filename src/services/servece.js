
export default class FilmServece {
    _apiBase = 'https://api.themoviedb.org/3';
    _apiKey = 'api_key=6c8fa39627c89b3c87ca11fd477aab8c&'
    
    constructor(){};
    async getResource(url) {
        const res = await fetch(`${this._apiBase}/search/movie?${this._apiKey}&${url}`)
        if(!res.ok){
            throw new Error(`Could not fetch ${url}`)
        }
        return res.json();
    };
    async getFilms(filmName = 'return', page = 1){
        const res = await this.getResource(`page=${page}&query=${filmName}`);
        return res.results
    }
    async getConfig(){
        let url = `${this._apiBase}/configuration?${this._apiKey}`
        const config = await fetch(url)
        .then((result)=>{
            return result.json();
        })
        .then((data)=>{
           return data.images
        })
     return config
    }

};
const getFilm = new FilmServece();
// const test = getFilm.getFilms('return', 1);
// const test2 = getFilm.getConfig()
// console.log(test2);