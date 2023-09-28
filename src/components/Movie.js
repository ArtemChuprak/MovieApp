import React from "react";
import { Card , Space } from 'antd';
import { format, parseISO } from 'date-fns';
import {RateStars} from "./RateStars"
import GenresContext from "./GenresContext";
import { Genre } from "./Genre";


 const Movie = (props) => (
    
    <GenresContext.Consumer>
         {(genres) => {
      const movieGenre = [...props.genreIds];
      const element = genres.map(({ id, name }) => (movieGenre.includes(id) ? <Genre name={name} key={id} /> : null));

        function dottede() {
            const wordLength = 20;
            const wordJewish = props.overview.split(" ").length
            const arr = props.overview.split(" ")
            
            if(wordJewish >= wordLength ) {
            return `${arr.slice(0, wordLength).join(" ")}...`

            } else return props.overview
        }
        
        const numberRating = props.vote.toFixed(1);


        function colored (){

            let colorRound = "";

            if(numberRating < 3) {
                colorRound = "#E90000"
            }
            if(numberRating >= 3 && numberRating <= 5) {
                colorRound = "#E97E00"
            }
            if(numberRating > 5 && numberRating <= 7 ) {
                colorRound = "#E9D100"
            }
            if(numberRating > 7){
                colorRound = "#66E900"

            }
            return colorRound

        }

        return (
            
            <div className="card">

            {/* Картинка */}
            {
                    props.image == null ? <img className="cardPicture" src ={`https://hobbykmv.ru/pics/1_159.gif`} alt="card" style={{width: 183, height: 281}}/> : <img className="cardPicture" src ={`https://image.tmdb.org/t/p/w185${props.image}`} alt="card" />
                }
                <div className="contentContainer" >

                    <div className="headerContainer">
                            
                        <h2 className="headerTitle">{props.title}

                            {/* Рейтинг в круге */}
                            
                            <div className="ratingRound" style={{borderColor: colored()}} >
                                <div style={{textAlign:'center', fontSize:'12'}}>{numberRating}</div>
                                
                            </div> 
                        </h2>
        
                    </div>
            

                    <div className="containerText">
                    
                        {/* DATE */}

                        <div className="dateRelease">{props.release ?  format(parseISO(props.release), 'MMMM d, y') : ""}</div>
                    
                       
                       
                            <div className="movieGenre">{element}</div>
                            
                       
                        
                        <p className="overviewMovie">{dottede()}</p>

                        <RateStars getRatedMovie={(value)=> props.getRatedMovie(value)} ratedID={props.ratedID} setValue={props.ids ? props.ratedId[props.ids] : 0}/>
                        
                        
                    </div>

                </div>

            </div>
           

        )
         

}}
</GenresContext.Consumer>)

export default Movie;