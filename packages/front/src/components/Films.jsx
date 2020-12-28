import React, {useEffect, useState} from 'react';
import Movie from './Movie'
import DropdownMenu from './DropdownMenu'
import Pagination from './Pagination';


function Films() {
    
    const [films, setFilms] = useState([]);
    const [genre, setGenre] = useState(28);
    const [showPagination, setShowPagination] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const MOVIE_GENRE_API = `https://api.themoviedb.org/3/discover/movie?api_key=269942df022fac8e94e126c0e90c61ee&with_genres=${genre}&page=${currentPage}`
    
    
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

    const newPage = (direction) => {
        if (direction === "next") {
            setCurrentPage(currentPage + 1);
            console.log("current page", currentPage);
        } else if (direction === "previous" && currentPage != 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    useEffect(() => {
        getAllFilms();
      }, [currentPage, genre])

    return (
        <div>
            <DropdownMenu
                setID={setID}
                setGenre={setGenre}
            />
            {/* All Movies */}
            <h1 className="movie-header">Films</h1>
            <div className="movie-container">
                {films.length > 0 && films.map((movie) => (
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

export default Films;
