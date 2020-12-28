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
        <Router basename="/movieapp">
          <Nav />

          <Route exact path="/films">
            <Films />
          </Route>

          <Route exact path="/series">
            <Series />
          </Route>   

          <Route exact path="/search">
            <SearchResult />
          </Route> 

          <Route exact path="/now-playing">
            <NowPlayingMovies />
          </Route>

          <Route exact path="/">
            <Home />
          </Route>         
        
        </Router>
    );
}

export default App;
