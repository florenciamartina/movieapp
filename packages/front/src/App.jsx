import React, {useEffect, useState} from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Home from './components/Home';
import Films from './components/Films';
import Series from './components/Series';
import Movie from './components/Movie';
import Nav from './components/Nav'

const SEARCH_GENRE_API = "https://api.themoviedb.org/3/discover/movie?api_key=###&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&with_genres="
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=269942df022fac8e94e126c0e90c61ee&query="

function App() {  
    const [movies, setMovies] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const getMovies = (API) => {
      fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setSearchResult(data.results);
      });
    };


    const handleOnSubmit = (e) => {
      e.preventDefault();
      
      if (searchTerm) {
        getMovies(SEARCH_API + searchTerm);
        setIsSearch(true);
        setSearchTerm("");
      }
    };

    const handleOnChange = (e) => {
      setSearchTerm(e.target.value);
    }

    return (
        <Router>
          <Nav
              handleOnChange={handleOnChange}
              handleOnSubmit={handleOnSubmit}
              setIsSearch={setIsSearch}
              searchTerm={searchTerm}
          />      

          <Route exact path="/films">
            <Films />
          </Route>   

          <Route exact path="/series">
            <Series />
          </Route>   

          <Route exact path="/">
            <Home 
              searchResult={searchResult}
              isSearch={isSearch}
            />
          </Route>
        
        </Router>
    );
}

export default App;
