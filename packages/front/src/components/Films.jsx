import React, {useEffect, useState} from 'react';
import Movie from './Movie'
import DropdownMenu from './DropdownMenu'



function Films() {
    
    const [films, setFilms] = useState([]);
    const [genre, setGenre] = useState(28);
    const MOVIE_GENRE_API = `https://api.themoviedb.org/3/discover/movie?api_key=269942df022fac8e94e126c0e90c61ee&with_genres=${genre}`
    const MOVIE_API = `https://api.themoviedb.org/3/discover/movie?api_key=269942df022fac8e94e126c0e90c61ee`
    
    
    const setID = (id) => {
        console.log("genre", genre);
        setGenre(id);
    }
    
    const getAllFilms = () => {
        fetch(MOVIE_GENRE_API)
        .then((res) => res.json())
        .then((data) => {
          setFilms(data.results);
        });
    }

    useEffect(() => {
        getAllFilms();
      }, [])

    return (
        <div>
            <DropdownMenu
                setID={setID}
                setGenre={setGenre}
            />
            {/* All Movies */}
            <h2 className="movie-header">All Movies</h2>
            <div className="movie-container">
                {films.length > 0 && films.map((movie) => (
                    <Movie key={movie.id} {...movie}/>
                ))}
            </div>
        </div>
    )
}

export default Films;
