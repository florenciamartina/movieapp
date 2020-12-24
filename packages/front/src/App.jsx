import React, {useEffect, useState} from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Home from './components/Home';
import Films from './components/Films';
import Series from './components/Series';
import Nav from './components/Nav'
import SearchResult from './components/SearchResult';


function App() {  
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResult, setSearchResult] = useState([]);

   
    const handleOnSubmit = (e) => {
      e.preventDefault();
      
      if (searchKeyword) {
        setSearchKeyword("");
      }
    };

    const handleOnChange = (e) => {
      setSearchKeyword(e.target.value);
      console.log(searchKeyword);
    }

    return (
        <Router>
          <Nav
              handleOnChange={handleOnChange}
              handleOnSubmit={handleOnSubmit}
              searchKeyword={searchKeyword}
          />      

          <Route exact path="/films">
            <Films />
          </Route>   

          <Route exact path="/series">
            <Series />
          </Route>   

          <Route exact path="/search">
            <SearchResult
              searchKeyword={searchKeyword}
              searchResult={searchResult}
            />
          </Route> 

          <Route exact path="/">
            <Home />
          </Route>         
        
        </Router>
    );
}

export default App;
