import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Input from './Components/Input';
import SearchResult from './Components/SearchResult';
import Header from './Components/Header';
import Error from './Components/Error';
import LoadMore from './Components/LoadMore';
import AdMovies from './Components/AdMovies';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      rowData: [], 
      movies: [], 
      inputValue: "", 
      error: "", 
      page:1, 

      adData: []
    }
  }


  componentDidMount() {
    const adtitle = ["Avatar", "Gladiator", "Love", "Date"];
    // default ad poster
    fetch(`http://www.omdbapi.com/?s=${adtitle[0]}&page=1&apikey=cb289192`)
        .then(res => res.json())
        .then(adData => {
          this.setState({adData})
      })  
        // change ad poster every couple seconds
    this.interval = setInterval(()=>{
      const rdm = parseInt(Math.floor(Math.random()*4));
      const randomAd = adtitle[rdm];
      fetch(`http://www.omdbapi.com/?s=${randomAd}&page=1&apikey=cb289192`)
        .then(res => res.json())
        .then(adData => {
          this.setState({adData})
      })  
    }, 5000)
  }

componentWillUnmount() {
  clearInterval(this.interval)
}



  onChange = (e) =>{
    this.setState({inputValue:e.target.value})
  }


  onSearch = () =>{
    const { inputValue, error }  = this.state;

    if(inputValue){
        fetch(`http://www.omdbapi.com/?s=${inputValue}&page=1&apikey=cb289192`)
          .then(res => res.json())
          .then(rowData => this.setState({
                rowData, 
                movies: rowData.Search,
                // inputValue: '',
                }))
    } else {
          this.setState({error:"Please enter a movie name"})
            setTimeout(() =>{
            this.setState({error:''})
        }, 2000)
    }
  
  }

//Loading more data 
    showMore = () =>{
      const { inputValue, page} = this.state;
          let nextPage = page + 1;
          fetch(`http://www.omdbapi.com/?s=${inputValue}&page=${nextPage}&apikey=cb289192`)
          .then(res => res.json())
          .then(pgData => this.setState({
              page:nextPage, 
              movies: [...this.state.movies, ...pgData.Search]
          }))
      } 
     

  render(){
    const { rowData, movies, error, page, adData, inputValue } = this.state;
    console.log(rowData.totalResults)
  
    return (
      <div>
        <div className="inputBox">
          <Header/>
          <Input inputValue={inputValue} onChange={this.onChange} onSearch={this.onSearch}/>
          <Error error = {error}/>
          </div>
          <AdMovies adData={this.state.adData}/>
          <SearchResult movies={movies} results = {rowData.totalResults} response={rowData.Response} error={rowData.Error} page={page} rowData={rowData}/>
          {page >=1 && rowData.Response === "True" ? (<LoadMore showMore={this.showMore}/>): null}
      </div>
    );
  }
}

export default App;
