import React, {useState, useEffect} from 'react'
import Modal from 'react-modal';

const IMG_API = "https://image.tmdb.org/t/p/w500";
const MOVIE_GENRE_API = "https://api.themoviedb.org/3/genre/movie/list?api_key=269942df022fac8e94e126c0e90c61ee&language=en-US"

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
    const INFO_API = `https://api.themoviedb.org/3/movie/${id}?api_key=269942df022fac8e94e126c0e90c61ee&language=en-US`
    const CREDITS_API = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=269942df022fac8e94e126c0e90c61ee&language=en-US`
    const [isNowPlaying, setIsNowPlaying] = useState(false);
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
                            <img className="overview-img" src={IMG_API + poster_path} alt ={title}/>

                            <div className="movie-overview-text">
                                <h2>Overview :</h2>
                                <h3>{overview}</h3>

                                <div className="movie-overview-info">
                                    <h3>Director :&nbsp; </h3>
                                    {movieCredits.cast.length > 0 && movieCredits.crew
                                        .filter((crew) => crew.job==="Director")
                                        .map((dir) => (
                                        <h3 className="movie-cast">{dir.name},&nbsp;</h3>
                                    ))}
                                </div>

                                <div className="movie-overview-info">
                                    <h3>Cast :&nbsp; </h3>
                                    {movieCredits.cast.length > 0 && movieCredits.cast.slice(0,4).map((cast) => (
                                        <h3 className="movie-cast">{cast.name},&nbsp;</h3>
                                    ))}
                                </div>

                                <div className="movie-overview-info">
                                    <h3>Writer :&nbsp; </h3>
                                    {movieCredits.cast.length > 0 && movieCredits.crew
                                        .filter((crew) => crew.job==="Writer")
                                        .map((writer) => (
                                        <h3 className="movie-cast">{writer.name},&nbsp;</h3>
                                    ))}
                                </div>

                                <div className="movie-overview-info">
                                    <h3>Genres : &nbsp;</h3>
                                    {movieGenres.genres.length > 0 && movieGenres.genres.map((genre) => (
                                        <h3>{genre.name},&nbsp;</h3>
                                    ))}
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
