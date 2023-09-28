import React from "react";
import Movie from "./Movie"
// import "./MovieList.css"
import './App.css';

const MovieList = (props)=> {
    
    return (
          
    <div className="container"
    //  style={{
    //     display: 'flex',
    //     flexDirection: 'column',
    //     marginLeft: '50%', 
    //     marginRight: '50%',
    //     maxWidth: '768px', 
    //   }}
      >
        {
            props.movies.map((movie, i) => {
             
                return(
                    <Movie key={i}
                    image={movie.poster_path}
                    title ={movie.title}
                    release={movie.release_date}
                    overview={movie.overview}
                    vote={movie.vote_average}
                    getRatedMovie={(value)=> props.getRatedMovie(movie.id,value)}
                    genreIds={movie.genre_ids}
                    
                    />
                )
            })
        }
    </div>
    )

}

export default MovieList;