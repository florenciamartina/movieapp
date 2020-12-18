import React, {useEffect, useState} from 'react';
import Movie from './Movie'
import SeriesDropdownMenu from './SeriesDropdownMenu'



function Series() {
    
    const [series, setSeries] = useState([]);
    const [genreID, setGenreID] = useState(28);
    const SERIES_API = `https://api.themoviedb.org/3/discover/tv?api_key=269942df022fac8e94e126c0e90c61ee&with_genres=${genreID}`;

    const getAllSeries = () => {
        fetch(SERIES_API)
        .then((res) => res.json())
        .then((data) => {
          setSeries(data.results);
        });
    }

    useEffect(() => {
        getAllSeries();
      }, [])

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

        </div>
    )
}

export default Series;
