import React, {Component} from "react";
import GenresContext from "./GenresContext";
import './App.css';
import SearchArea from "./SearchArea";
import MovieList from "./MovieList";
import Loading from "./Loading";
import Error from "./Error";
import { Pagination, Tabs } from 'antd';
import { debounce } from "lodash";
import {RatedFilms} from "./RatedFilms"
import NoFilm from "./NoFilm";

class App extends Component {
   
    constructor() {
        super()
        this.state ={
            movies: [],
            ratedMovies:[],
            searchTerm: "",
            loading: false,
            error: false,
            totalResults: 0,
            curentPage:1,
            genres: [],
            idSession:"",
            ratedId:{}
            
        }
    }


    // ПОИСК
    handleSubmit = debounce(async(e)=> {
        e.preventDefault();
        this.setState({loading: true})
        try {
           await fetch(`https://api.themoviedb.org/3/search/movie?api_key=9a82e2bd4bacce1eedc604cffe8c592f&query=${this.state.searchTerm}&page=${this.state.curentPage}`)

           .then(data => data.json())
        .then(data => {
            console.log(data);
            
            this.setState({movies: [...data.results], loading: false, error:false, totalResults :data.total_results})
        })
        }
        catch(e) {
            this.setState({error: true, loading: false})
            console.log(e) 
        } 
    },500)

    handleChange = (e)=> {
     
        this.setState({searchTerm: e.target.value})

    }

// Пагинация
    setCurentPage = async (page) => {
        
        this.setState({curentPage: page, loading: true})
        await fetch(`https://api.themoviedb.org/3/search/movie?api_key=9a82e2bd4bacce1eedc604cffe8c592f&query=${this.state.searchTerm}&page=${page}`)
    
           .then(data => data.json())
            .then(data => {
            console.log(data);
        
                this.setState({movies: [...data.results], loading: false, error:false, totalResults :data.total_results})
        })
        
    
    }

    // Жанры

    setGenres = async ()=> {
        
        await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=9a82e2bd4bacce1eedc604cffe8c592f`)
        .then(data => data.json())
        .then(data => {
            console.log("Ganres",data); 
            this.setState({genres:[...data.genres]})  
           
        })
        
    }

    // Гостевая сессия

    getSession = async () => {
     await fetch(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=9a82e2bd4bacce1eedc604cffe8c592f`)
     .then(data => data.json())
     .then((idSession)=> {
        this.setState({
            idSession: idSession.guest_session_id
        })
     })

    }

    getIdSessionMovies = async () => {
        const{ idSession }= this.state;
        this.setState({
            ratedMovies:[],
        });
         await fetch(`https://api.themoviedb.org/3/guest_session/${idSession}/rated/movies?api_key=9a82e2bd4bacce1eedc604cffe8c592f&language=en-US&sort_by=created_at.asc`)
         .then(data => data.json())
         .then((movies)=> {
            console.log(movies)
            this.setState({
                ratedMovies:[ ...movies.results]
            })
         })
    }


    getRatedMovie = async (id,value) => {
        console.log(id,value)
        if(value === 0) {
            return null;
        }
     const{idSession} = this.state;
     await fetch(`https://api.themoviedb.org/3/movie/${id}/rating?api_key=9a82e2bd4bacce1eedc604cffe8c592f&guest_session_id=${idSession}`,
     {method: 'POST',
      headers:{'Content-Type':'application/json;charset=utf-8'},
        body:JSON.stringify({
            value:value,
        })}
     ).then((item)=>
     this.setState(({ratedId}) => {
        console.log(item)
        const rateObj = {...ratedId,[id]:value};
        return {ratedId: rateObj}
     }))

    }


   componentDidMount() {
    this.getSession()
    this.setGenres()
    
   }
    
    render() {
        
        const {TabPane} =Tabs;
        const {loading, error, totalResults, curentPage,  ratedMovies, ratedId, genres} = this.state
        
        return(

            <GenresContext.Provider value={genres}>
            
            <div className="App">
               
            <div className="app__wrapper">

                <Tabs defaultActiveKey="1" centered onChange={()=> this.getIdSessionMovies()}>
                    <TabPane tab="Search" key="1">

                        <div className="searchContainer">
                         <SearchArea handleSubmit={this.handleSubmit} handleChange={this.handleChange}  />
                        </div>

                        <div className="cardsContainer"> 

                                {loading  && !error ? <Loading />:
                                error && !loading ? <Error />:
                                this.state.movies.length > 0 ?(
                                <MovieList movies={this.state.movies}
                                getRatedMovie={(id, value)=> this.getRatedMovie(id,value)}
                                genres={genres}
                                
                                
                                /> ):<NoFilm />} 

                        
                        </div>


                        <div className=" searchContainer">
                            {this.state.movies.length > 0 ?(
                                <Pagination defaultCurrent={1} 
                                            pageSize ={20}
                                            total={totalResults} 
                                            curent= {curentPage}
                                            showSizeChanger={false} 
                                            onChange={(page,pageSize) => this.setCurentPage(page)}
                                            
                                />): null}
                        </div>
                    </TabPane> 
                    <TabPane tab="Rated" key="2" onChange={()=>this.getIdSessionMovies()}>
                        <RatedFilms
                        ratedMovies={ratedMovies}
                        getRatedMovie={(id, value)=> this.getRatedMovie(id,value)}
                        ratedId={ratedId}
                        genres={genres}/>
                        
                    </TabPane>
                </Tabs> 
                </div>

            </div>
            </GenresContext.Provider>
        )
    }
}

export default App;