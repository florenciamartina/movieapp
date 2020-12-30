import React, {useEffect, useState} from 'react';
import Movie from './components/Movie'
import Pagination from './components/Pagination';
import { useLocation } from "react-router-dom";
import TvSeries from './components/TvSeries';

function SearchResult(props) {
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchResult, setSearchResult] = useState([]);
    const [tvSearchResult, setTVSearchResult] = useState([]);
    const [showPagination, setShowPagination] = useState(true);
    const searchKeyword = location.state.queryKeyword;

    const newPage = (direction) => {
        if (direction === "next") {
            setCurrentPage(currentPage + 1);
            console.log("current page", currentPage);
        } else if (direction === "previous" && currentPage != 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const getSearchResult = () => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=269942df022fac8e94e126c0e90c61ee&query=${searchKeyword}&page=${currentPage}`)
        .then((res) => res.json())
        .then((data) => {
            setSearchResult(data.results || []);
        })
    }

    const getTVSearchResult = () => {
        fetch(`https://api.themoviedb.org/3/search/tv?api_key=269942df022fac8e94e126c0e90c61ee&query=${searchKeyword}&page=${currentPage}`)
        .then((res) => res.json())
        .then((data) => {
            setTVSearchResult(data.results || []);
        })
    }


    useEffect(() => {
        getSearchResult();
        getTVSearchResult();
    }, [searchKeyword, currentPage]);

    return (
    
        <div>
            {searchResult.length > 0 ? (
                <>
                    <h1 className="movie-header">Showing {searchResult.length + tvSearchResult.length} result(s)</h1>
                    <div className="movie-container">
                        {searchResult.map((movie) => (
                            <Movie key={movie.id} {...movie}/>
                        ))}
                        {tvSearchResult.map((series) => (
                            <TvSeries key={series.id} {...series}/>
                        ))}
                        
                    </div>
                    <Pagination 
                        newPage={(d) => newPage(d)}
                        showPagination={showPagination}                
                    />
                </>
            ) :
            
                <div>
                    <h3 className="movie-header">Oops, no results found.</h3>
                </div>

            }
        </div>
    )
}

export default SearchResult;
