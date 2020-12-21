import React, {useEffect, useState} from 'react';
import Movie from './Movie'
import SeriesDropdownMenu from './SeriesDropdownMenu'
import Pagination from './Pagination';


function Series() {
    
    const [series, setSeries] = useState([]);
    const [showPagination, setShowPagination] = useState(true);
    const [genreID, setGenreID] = useState(28);
    const [currentPage, setCurrentPage] = useState(1);
    const SERIES_API = `https://api.themoviedb.org/3/discover/tv?api_key=269942df022fac8e94e126c0e90c61ee&with_genres=${genreID}&page=${currentPage}`;

    const getAllSeries = () => {
        fetch(SERIES_API)
        .then((res) => res.json())
        .then((data) => {
          setSeries(data.results);
        });
    }

    const newPage = (direction) => {
        if (direction === "next") {
            setCurrentPage(curr => curr + 1);
        } else if (direction === "previous" && currentPage != 1) {
            setCurrentPage(curr => curr - 1);
        }
    }

    useEffect(() => {
        getAllSeries();
      }, [currentPage, genreID])

    return (
        <div>
            <SeriesDropdownMenu 
                setGenreID={setGenreID}
            />
            {/* All Movies */}
            <h2 className="movie-header">All TV Series</h2>
                <div className="movie-container">
                    {series.length > 0 && series.map((movie) => (
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

export default Series;
