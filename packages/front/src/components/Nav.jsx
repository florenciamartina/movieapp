import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

function Nav(props) {
    const [show, handleShow] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

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
            <Link to="/search" className="menu-choice"> 
              {/* Search */}
              <form onSubmit={props.handleOnSubmit}>
                <input className="search"
                  type="search" 
                  placeholder="Search..."
                  value={props.searchKeyword}
                  onChange={props.handleOnChange}
                />
              </form>
            </Link>

        </header>
    )
}

export default Nav
