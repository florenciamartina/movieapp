import React, {useRef, useState, useEffect} from 'react'

const MOVIE_GENRE_API = "https://api.themoviedb.org/3/genre/movie/list?api_key=269942df022fac8e94e126c0e90c61ee&language=en-US"

function DropdownMenu({setGenre}) {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const [genreID, setGenreID] = useState();
    const [movieGenres, setMovieGenres] = useState([]); 
    const onClick = () => setIsActive(!isActive);

    const getMovieGenres = () => {
        fetch(MOVIE_GENRE_API)
        .then((res) => res.json())
        .then((data) => {
          setMovieGenres(data.genres);
        });
      };
    
    useEffect(() => {
        getMovieGenres();
    }, [])


    return (
        <select onChange={(e) => setGenre(e.target.value)}>
            {movieGenres.length > 0 && movieGenres.map((genre) => (
                <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
        </select>
     
    );
  };

export default DropdownMenu;