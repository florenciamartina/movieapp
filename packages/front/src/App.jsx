import React, {useEffect, useState} from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Home from './components/Home';
import Films from './components/Films';
import Series from './components/Series';
import Nav from './components/Nav'
import SearchResult from './components/SearchResult';
import NowPlayingMovies from './NowPlayingMovies';


function App() {
    return (
        <Router>
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
