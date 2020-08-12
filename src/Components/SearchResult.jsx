import React, { Component } from 'react';
import '../App.css';


class SearchResult extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        const {rowData, movies, response, error, results, page} = this.props
        console.log(response, "response")
        let data;
        if(response==="True"){
            data = movies.map((movie, ind) =>{
                return (
                      <div key = {ind} className="movie-content">
                          <img src={movie.Poster} className="poster" alt="poster of movies"/>
                          <h5>Title: {movie.Title}</h5>
                          <p>Year: {movie.Year}</p>
                          <p>Type: {movie.Type}</p>
                      </div>
                    )
            })
        }
        else{data = <div>{error}</div>}

        return (
            <div className="container">
                    <div className="total-results">
                    {
                        page >=1 && rowData.Response === "True" ? (<p>Total results: {results}</p>):null
                    }
                    </div>
                <div className="movies-container">
                    {data}
                </div>
            </div>
           
        )      
    }
}


export default SearchResult;

