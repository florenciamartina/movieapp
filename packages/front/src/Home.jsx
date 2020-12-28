import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import DropdownMenu from '../src/components/DropdownMenu';
import Movie from '../src/components/Movie';

const NOW_PLAYING_API = "https://api.themoviedb.org/3/movie/now_playing?api_key=269942df022fac8e94e126c0e90c61ee"
const TOP_TEN_API = "https://api.themoviedb.org/3/movie/top_rated?api_key=269942df022fac8e94e126c0e90c61ee&sort_by=vote_average.desc&primary_release_date.gte=2020-01-01&primary_release_date.lte=2020-12-31"
const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?api_key=269942df022fac8e94e126c0e90c61ee&sort_by=popularity.desc"
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=269942df022fac8e94e126c0e90c61ee&query="

function Home(props) {
    
    const [movies, setMovies] = useState([]);
    const [topTen, setTopTen] = useState([]);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [isNowPlaying, setIsNowPlaying] = useState(false);

    const getMovies = (API) => {
        fetch(API)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results);
        });
      };
  
      const getTopTenMovies = () => {
        fetch(TOP_TEN_API)
        .then((res) => res.json())
        .then((data) => {
          setTopTen(data.results);
        });
      }
  
      const getNowPlayingMovies = () => {
        fetch(NOW_PLAYING_API)
        .then((res) => res.json())
        .then((data) => {
          setNowPlaying(data.results);
        });
      }
  
      useEffect(() => {
          getTopTenMovies();
          getMovies(FEATURED_API);
          getNowPlayingMovies();
        }, [])

    return (
        <>
        {!props.isSearch && (
            <div>
                {/* Now Playing Movies */}
                <Link to="/now-playing">
                    <button className="movie-header-button">Now Playing</button>
                </Link>
                <div className="movie-container">
                    {nowPlaying.length > 0 && nowPlaying.map((movie) => (
                        <Movie key={movie.id} {...movie}/>
                    ))}
                </div>

                {/* Top 10 Picks */}
                <h2 className="movie-header">Top 10 Picks</h2>
                <div className="movie-container">
                    {topTen.length > 0 && topTen.slice(0, 10).map((movie) => (
                        <Movie key={movie.id} {...movie}/>
                    ))}
                </div>

                {/* Featured Movie */}
                <h2 className="movie-header">Featured</h2>
                <div className="movie-container">
                    {movies.length > 0 && movies.map((movie) => (
                        <Movie key={movie.id} {...movie}/>
                    ))}
                </div>  
            </div>
        )}

        {props.isSearch && (
             <div className="movie-container">
                {props.searchResult.length > 0 && props.searchResult.map((movie) => (
                    <Movie key={movie.id} {...movie}/>
                ))}
            </div>
        )}
        </>
    )
}

export default Home;
