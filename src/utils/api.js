const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3'
const MOVIE_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const baseRequestParams =`?api_key=${MOVIE_API_KEY}`
console.log(process.env.NEXT_PUBLIC_TMDB_API_KEY)
console.log(process.env)


const getGenres = async () => {
    const genreRequestEndpoint = 'genre/movie/list'
    const urlToFetch = API_BASE_URL + genreRequestEndpoint + baseRequestParams

    try {
        const response = await fetch(urlToFetch, {
            method: 'GET',
            headers: {accept: 'application/json'}
        });

        if(response.ok){
            const jsonResponse = await response.json()
            console.log(jsonResponse.genres);
            const genres = jsonResponse.genres;
            return genres
        }
    } catch (err) {
        console.log('Error getting movie genres', err)
    }
}


// get movies by genre



// get movie by name query=blue&include_adult=false&page=1
const getMovie = async ({name,adult = false,page = 1}) => {

    if(!name){
        return new Error('No movie search term entered.')
    }
    const getMovieEndpoint = '/search/movie/'
    const requestParams = `&query=${name}&include_adult=${adult}&page=${page}`
    const urlToFetch = TMDB_API_BASE_URL + getMovieEndpoint + baseRequestParams + requestParams
    console.log(urlToFetch)
    try {
        const response = await fetch(urlToFetch, {
            method: 'GET',
            headers: {accept: 'application/json'}
        })
        
        if(response.ok){
            console.log(response)
            const jsonResponse = await response.json()
            //Find movie
            console.log(jsonResponse.results)
            const movie = jsonResponse.results

        }
        
    } catch (err) {
        console.log(`Error finding movie with ${name}`, err)
        
    }
}

getMovie({name:'harry'})