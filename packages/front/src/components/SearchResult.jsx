import React, {useEffect, useState} from 'react';
import Movie from './Movie'
import Pagination from './Pagination';

function SearchResult(searchKeyword) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchResult, setSearchResult] = useState([]);
    const [showPagination, setShowPagination] = useState(true);
    const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=269942df022fac8e94e126c0e90c61ee&query=${searchKeyword}&page=${currentPage}`;

    const newPage = (direction) => {
        if (direction === "next") {
            setCurrentPage(currentPage + 1);
            console.log("current page", currentPage);
        } else if (direction === "previous" && currentPage != 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const getSearchResult = () => {
        fetch(SEARCH_API)
        .then((res) => res.json())
        .then((data) => {
            setSearchResult(data.results);
        })
    }

    useEffect(() => {
        getSearchResult();
    }, [currentPage, searchKeyword])


    return (
    
        <div>
            {searchResult.length > 0 ? (
                <>
                    <div className="movie-container">
                        {searchResult.map((movie) => (
                            <Movie key={movie.id} {...movie}/>
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
