import React, {useState, useEffect} from 'react'
import Modal from 'react-modal';

const setVoteClass = (vote) => {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 6) {
        return "orange";
    } else {
        return "red";
    }
}

function Movie({id, title, poster_path, overview, vote_average}) {
    const IMG_API = "https://image.tmdb.org/t/p/w500";
    const INFO_API = `https://api.themoviedb.org/3/movie/${id}?api_key=269942df022fac8e94e126c0e90c61ee&language=en-US`
    const CREDITS_API = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=269942df022fac8e94e126c0e90c61ee&language=en-US`
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [movieGenres, setMovieGenres] = useState({
        genres:'',
        release_date:'',
    }); 
    const [movieCredits, setMovieCredits] = useState({
        cast:'',
        crew:''
    })

    const getMovieGenres = () => {
        fetch(INFO_API)
        .then((res) => res.json())
        .then((data) => {
          setMovieGenres({
              ...movieGenres,
              ...data,
          });
        });
      };

    const getMovieCredits = () => {
        fetch(CREDITS_API)
        .then((res) => res.json())
        .then((data) => {
          setMovieCredits({
            ...movieCredits,
            ...data,
          });
        });
      };

    const PopUpBox = () => {
        return (
            <Modal className="movie-overview"
                    isOpen={true}
                    onRequestClose={() => setModalIsOpen(false)}
                >
                    <div>
                        <button className="close" onClick={() => setModalIsOpen(false)}></button>
                        <div className="movie-overview-container">
                            <div className="movie-poster-button">
                                <img className="overview-img" src={IMG_API + poster_path} alt ={title}/>
                                {movieGenres.release_date >= "2020-01-01" && movieGenres.release_date <= "2020-12-31" && (
                                    <button className="book-button">Book Ticket</button>)
                                }
                            </div>
                            <div>
                                <h2 className="overview-title">{title}</h2>
                                <div className="overview-header">
                                    <h3 className="overview-header-info">{movieGenres.release_date.slice(0, 4)}</h3>
                                    <div className="movie-rating-container">
                                        <img className="star-icon" src="https://img.icons8.com/fluent/48/000000/star.png"/>
                                        <h3 className="overview-header-info">{vote_average}</h3>
                                    </div>
                                    { movieGenres.genres.length > 0 &&
                                        (<h3 className="overview-film-genre-info"> {
                                            movieGenres.genres.slice(0,3).map(genre => genre.name).join(", ") }
                                        </h3> )}
                                    </div>
                                <hr /> 
                                <h3 className="overview-overview">{overview}</h3>

                                <div className="movie-overview-info">
                                    <span className="overview-role">Director</span>
                                    <div className="movie-cast-container">
                                        { movieCredits.crew.length > 0 &&
                                        (<h3 className="movie-cast"> {
                                            movieCredits.crew.filter((crew) => crew.job==="Director")
                                            .map(dir => dir.name).join(", ") }
                                        </h3> )}
                                    </div>
                                </div>

                                <div className="movie-overview-info">
                                    <span className="overview-role">Cast</span>
                                    <div className="movie-cast-container">
                                        { movieCredits.cast.length > 0 &&
                                        (<h3 className="movie-cast"> {
                                            movieCredits.cast.slice(0,5).map(cast => cast.name).join(", ") } 
                                        </h3> )}
                                    </div>
                                </div>

                                <div className="movie-overview-info">
                                    <span className="overview-role">Writer</span>
                                    <div className="movie-cast-container">   
                                        { movieCredits.crew.length > 0 &&
                                        (<h3 className="movie-cast"> {
                                            movieCredits.crew.filter((crew) => crew.job==="Writer")
                                            .map(writer => writer.name).join(", ") } 
                                        </h3> )}                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
        )
    }
    
    useEffect(() => {
        getMovieCredits();
        getMovieGenres();
    }, [])


    return (
        <>
        {modalIsOpen == true && (
            <PopUpBox />
        )}

        <div className="movie" onClick={() => setModalIsOpen(true)}>
            <img src={IMG_API + poster_path} alt ={title}/>

            <div className="movie-info">
                <h3>{title}</h3>

                <span className={`tag ${setVoteClass(vote_average)}`}>
                    {vote_average}
                </span>

            </div>

        </div>
        </>
    )
}

export default Movie;
