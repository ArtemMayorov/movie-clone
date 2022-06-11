
export default class FilmServece {
    _apiBase = 'https://api.themoviedb.org/3';
    // _apiKey = 'api_key=6c8fa39627c89b3c87ca11fd477aab8888c&' // кривой 
    _apiKey = 'api_key=6c8fa39627c89b3c87ca11fd477aab8c&'
    
    constructor(){};
    async getResource(url) {
        const res = await fetch(`${this._apiBase}/search/movie?${this._apiKey}&${url}`)
        if(!res.ok) throw new Error(`Could not fetch ${url}`)
        return res.json();
    };
    async getFilms(filmName = 'return', page = 1){
        const res = await this.getResource(`page=${page}&query=${filmName}`);
        return res.results
    }
};
