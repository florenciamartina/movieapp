import React, {useState, useEffect} from 'react'

const IMG_API = "https://image.tmdb.org/t/p/w500";
const MOVIE_GENRE_API = "https://api.themoviedb.org/3/genre/movie/list?api_key=269942df022fac8e94e126c0e90c61ee&language=en-US"

const setVoteClass = (vote) => {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 6) {
        return "orange";
    } else {
        return "red";
    }
}

function Movie({id, title, poster_path, overview, vote_average}) {
    const INFO_API = `https://api.themoviedb.org/3/movie/${id}?api_key=269942df022fac8e94e126c0e90c61ee&language=en-US`
    const CREDITS_API = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=269942df022fac8e94e126c0e90c61ee&language=en-US`
    const [movieGenres, setMovieGenres] = useState({
        genres:'',
        release_date:'',
    }); 
    const [movieCredits, setMovieCredits] = useState({
        cast:'',
        crew:''
    })

    const getMovieGenres = () => {
        fetch(INFO_API)
        .then((res) => res.json())
        .then((data) => {
          setMovieGenres({
              ...movieGenres,
              ...data,
          });
        });
      };

    const getMovieCredits = () => {
        fetch(CREDITS_API)
        .then((res) => res.json())
        .then((data) => {
          setMovieCredits({
            ...movieCredits,
            ...data,
          });
        });
      };
    
    useEffect(() => {
        getMovieCredits();
        getMovieGenres();
    }, [])


    return (
        <div className="movie">

            <img src={IMG_API + poster_path} alt ={title}/>

            <div className="movie-info">
                <h3>{title}</h3>

                <span className={`tag ${setVoteClass(vote_average)}`}>
                    {vote_average}
                </span>

            </div>

            <div className="movie-overview">
                <h2>Overview :</h2>
                <p>{overview}</p>

                {movieCredits.cast.length > 0 && movieCredits.cast.map((cast) => (
                    <p>{cast.name}</p>
                ))}

                {movieGenres.genres.length > 0 && movieGenres.genres.map((genre) => (
                    <p>{genre.name}</p>
                ))}
                
            </div>

        </div>
    )
}

export default Movie;
