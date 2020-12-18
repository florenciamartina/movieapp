import React, {useRef, useState, useEffect} from 'react'

const MOVIE_GENRE_API = "https://api.themoviedb.org/3/genre/movie/list?api_key=269942df022fac8e94e126c0e90c61ee&language=en-US"


function DropdownMenu() {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
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
        console.log("movie genres:", movieGenres);
    }, [])
  
    return (
      <div className="menu-container">
        <button onClick={onClick} className="menu-trigger">
        </button>
        <nav className="genre-container"ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
            <select>
            {movieGenres.length > 0 && movieGenres.map((genre) => (
                <option key={genre.id}>{genre.name}</option>
            ))}
          </select>
        </nav>
      </div>
    );
  };

export default DropdownMenu;