import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom';
import logo from '../src/resources/whale.png';
function Nav() {
  const history = useHistory();
  const [show, handleShow] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 5) {
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
      <header style={{
        backgroundColor: show ? 'transparent': '#22254b',
      }}>

      <div className="menu-category-container">
        <Link to="/" >
          <img className="logo" src={logo}></img>
        </Link>

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
