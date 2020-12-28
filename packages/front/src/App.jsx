import React, {useEffect, useState} from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Home from './Home';
import Films from './Films';
import Series from './Series';
import Nav from './Nav'
import SearchResult from './SearchResult';
import NowPlayingMovies from './NowPlayingMovies';


function App() {
    return (
        <Router >
          <Nav />

          <Route path='/films'>
            <Films />
          </Route>

          <Route path='/series'>
            <Series />
          </Route>   

          <Route path='/search'>
            <SearchResult />
          </Route> 

          <Route path='/now-playing'>
            <NowPlayingMovies />
          </Route>

          <Route path='/'>
            <Home />
          </Route>         
        
        </Router>
    );
}

export default App;
