import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom';

function Nav(props) {
  const history = useHistory();
  const [show, handleShow] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
          handleShow(true);
        } else {
          handleShow(false);
        }
      });
  
      return () => {
        window.removeEventListener('scroll', useEffect);
      };
    }, []);
  

  return (
      <header>

        <div className="menu-category">
          <Link to="/" >
              <button className="menu-choice">
                  Home
              </button>
          </Link>

          <Link to="/films" className="menu-choice">
              <button className="menu-choice">
                  Films
              </button>            
          </Link>

          <Link to="/series" className="menu-choice">
              <button className="menu-choice">
                  Series
              </button>            
          </Link>

        </div>
          
        {/* Search */}
        <input className="search"
          type="search" 
          placeholder="Search..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              history.push("/search", {
                queryKeyword: searchKeyword
              });
            }
          }}
        />

      </header>
  );
}

export default Nav;
