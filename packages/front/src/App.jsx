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
        <Router basename={'/movieapp'}>
          <Nav />

          <Route path={`${process.env.PUBLIC_URL}/films`}>
            <Films />
          </Route>

          <Route path={`${process.env.PUBLIC_URL}/series`}>
            <Series />
          </Route>   

          <Route path={`${process.env.PUBLIC_URL}/search`}>
            <SearchResult />
          </Route> 

          <Route path={`${process.env.PUBLIC_URL}/now-playing`}>
            <NowPlayingMovies />
          </Route>

          <Route path={`${process.env.PUBLIC_URL}/`}>
            <Home />
          </Route>         
        
        </Router>
    );
}

export default App;
