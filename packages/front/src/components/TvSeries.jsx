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

function TvSeries({id, name, poster_path, overview, vote_average}) {
    const IMG_API = "https://image.tmdb.org/t/p/w500";
    const INFO_API = `https://api.themoviedb.org/3/tv/${id}?api_key=269942df022fac8e94e126c0e90c61ee&language=en-US`
    const CREDITS_API = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=269942df022fac8e94e126c0e90c61ee&language=en-US`
    const [isNowPlaying, setIsNowPlaying] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tvGenres, setTvGenres] = useState({
        genres:'',
        first_air_date: ''
    }); 
    const [tvCredits, setTvCredits] = useState({
        cast:'',
        crew:''
    })

    const getTvGenres = () => {
        fetch(INFO_API)
        .then((res) => res.json())
        .then((data) => {
          setTvGenres({
              ...tvGenres,
              ...data,
          });
        });
      };

    const getTvCredits = () => {
        fetch(CREDITS_API)
        .then((res) => res.json())
        .then((data) => {
          setTvCredits({
            ...tvCredits,
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
                            <img className="overview-img" src={IMG_API + poster_path} alt ={name}/>
                        </div>
                            <div>
                                <h2 className="overview-title">{name}</h2>
                                <div className="overview-header">
                                    <h3 className="overview-header-info">{tvGenres.first_air_date.slice(0, 4)}</h3>
                                    <div className="movie-rating-container">
                                        <img className="star-icon" src="https://img.icons8.com/fluent/48/000000/star.png"/>
                                        <h3 className="overview-header-info">{vote_average}</h3>
                                    </div>
                                    <div className="movie-genre-container">
                                        { tvGenres.genres.length > 0 &&
                                            (<h3 className="overview-film-genre-info"> {
                                                tvGenres.genres.slice(0,3).map(genre => genre.name).join(", ") }
                                            </h3> )}
                                    </div>
                                </div>
                                <hr /> 
                                <h3 className="overview-overview">{overview}</h3>

                                <div className="movie-overview-info">
                                    <span className="overview-role">Director</span>
                                    <div className="movie-cast-container">
                                        { tvCredits.crew.length > 0 &&
                                            (<h3 className="movie-cast"> {
                                                    tvCredits.crew.filter((crew) => crew.job==="Director")
                                                .map(dir => dir.name).join(", ") }
                                            </h3> )}
                                    </div>
                                </div>

                                <div className="movie-overview-info">
                                    <span className="overview-role">Cast</span>
                                    <div className="movie-cast-container">
                                        { tvCredits.cast.length > 0 &&
                                            (<h3 className="movie-cast"> {
                                                tvCredits.cast.slice(0,5).map(cast => cast.name).join(", ") } 
                                            </h3> )}
                                    </div>
                                </div>

                                <div className="movie-overview-info">
                                    <span className="overview-role">Writer</span>
                                    <div className="movie-cast-container">
                                        { tvCredits.crew.length > 0 &&
                                            (<h3 className="movie-cast"> {
                                                tvCredits.crew.filter((crew) => crew.job==="Writer")
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
        getTvCredits();
        getTvGenres();
    }, [])


    return (
        <>
        {modalIsOpen == true && (
            <PopUpBox />
        )}

        <div className="movie" onClick={() => setModalIsOpen(true)}>
            <img src={IMG_API + poster_path} alt ={name}/>

            <div className="movie-info">
                <h3>{name}</h3>

                <span className={`tag ${setVoteClass(vote_average)}`}>
                    {vote_average}
                </span>

            </div>

        </div>
        </>
    )
}

export default TvSeries;
