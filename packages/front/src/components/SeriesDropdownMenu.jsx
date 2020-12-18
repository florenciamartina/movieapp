import React, {useRef, useState, useEffect} from 'react'

const TV_GENRE_API = "https://api.themoviedb.org/3/genre/tv/list?api_key=269942df022fac8e94e126c0e90c61ee&language=en-US"


function SeriesDropdownMenu(props) {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const [tvGenres, setTvGenres] = useState([]); 
    const onClick = () => setIsActive(!isActive);

    const getTvGenres = () => {
        fetch(TV_GENRE_API)
        .then((res) => res.json())
        .then((data) => {
          setTvGenres(data.genres);
        });
      };
    
    useEffect(() => {
        getTvGenres();
        console.log("tv genres:", tvGenres);
    }, [])
  
    return (
        <select onChange={(e) => props.setGenreID(e.target.value)}>
            {tvGenres.length > 0 && tvGenres.map((genre) => (
                <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
        </select>
        
    );
  };

export default SeriesDropdownMenu;