import React from "react";
import Movie from "./Movie";


export const RatedFilms = ({ratedMovies, getRatedMovie, ratedId}) => {

    return (

        <div className="container">
            {
                ratedMovies.map((movie, i) => {
                
                    return(
                        <Movie 
                        key={i} 
                        image={movie.poster_path}
                        title ={movie.title}
                        release={movie.release_date}
                        overview={movie.overview}
                        vote={movie.vote_average}
                        getRatedMovie={(value)=> getRatedMovie(movie.id,value)}
                        ratedId={ratedId}
                        ids={movie.id}
                        genreIds={movie.genre_ids}
                        
                        
                        />
                    )
                })
            }
        </div>
        )
    
    



}