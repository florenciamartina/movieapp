import React, {useEffect, useState} from 'react';
import Movie from './components/Movie'
import DropdownMenu from './components/DropdownMenu'
import Pagination from './components/Pagination';


function NowPlayingMovies() {
    
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [genre, setGenre] = useState(28);
    const [showPagination, setShowPagination] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const NOW_PLAYING_API = `https://api.themoviedb.org/3/movie/now_playing?api_key=269942df022fac8e94e126c0e90c61ee&with_genres=${genre}&page=${currentPage}`;
    
    
    const setID = (id) => {
        setGenre(id);
    }
    
    const getAllNowPlayingMovies = () => {
        fetch(NOW_PLAYING_API)
        .then((res) => res.json())
        .then((data) => {
          setNowPlayingMovies(data.results);
        });
    }

    const newPage = (direction) => {
        if (direction === "next") {
            setCurrentPage(currentPage + 1);
            console.log("current page", currentPage);
        } else if (direction === "previous" && currentPage != 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    useEffect(() => {
        getAllNowPlayingMovies();
      }, [currentPage, genre])

    return (
        <div>
            <DropdownMenu
                setID={setID}
                setGenre={setGenre}
            />
            {/* All Movies */}
            <h1 className="movie-header">Now Playing</h1>
            <div className="movie-container">
                {nowPlayingMovies.length > 0 && nowPlayingMovies.map((movie) => (
                    <Movie key={movie.id} {...movie}/>
                ))}
            </div>
            <Pagination 
                newPage={(d) => newPage(d)}
                showPagination={showPagination}                
            />
        </div>
    )
}

export default NowPlayingMovies;
