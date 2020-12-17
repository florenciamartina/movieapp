import React, {useEffect, useState} from 'react'
import Movie from './components/Movie';

const NOW_PLAYING_API = "https://api.themoviedb.org/3/movie/now_playing?api_key=269942df022fac8e94e126c0e90c61ee"
const TOP_TEN_API = "https://api.themoviedb.org/3/movie/top_rated?api_key=269942df022fac8e94e126c0e90c61ee"
const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?api_key=269942df022fac8e94e126c0e90c61ee&sort_by=popularity.desc"
const IMG_API = "https://image.tmbd.org/t/p/w1280"
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=269942df022fac8e94e126c0e90c61ee&query="

function App() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
    
  
    const getMovies = (API) => {
      fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
    };

    useEffect(() => {
        // getMovies(FEATURED_API);
        // getMovies(NOW_PLAYING_API);
        getMovies(TOP_TEN_API);
      }, [])
      
      const handleOnSubmit = (e) => {
        e.preventDefault();
        
        if (searchTerm) {
          getMovies(SEARCH_API + searchTerm);
          setSearchTerm("");
        }
      };
      
      const handleHome = (e) => {
        e.preventDefault();
        // getMovies(FEATURED_API);
        getMovies(NOW_PLAYING_API);
    }
    const handleOnChange = (e) => {
      setSearchTerm(e.target.value);
    }

    return (
      <>
        <header>
          <button className="home" onClick={handleHome}>
            Home
          </button>

          <form onSubmit={handleOnSubmit}>
            <input className="search"
              type="search" 
              placeholder="Search..."
              value={searchTerm}
              onChange={handleOnChange}
            />
          </form>
        </header>

        <div className="movie-container">
            {movies.length > 0 && movies.map((movie) => (
                <Movie key={movie.id} {...movie}/>
            ))}
        </div>
      </>
  )
}

export default App;
