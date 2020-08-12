import React from 'react';

const AdMovies = ({adData}) =>{
    let ad;
    if (adData.Search) {
        const adMovie = adData.Search[0];
        ad = (
              <div className="add-content">
                <img src={adMovie.Poster} id="ad-poster" alt="poster for ad movies" />
              </div>
          )
      }
    return(
        <section className="movie-ad" >
        <p>Don't miss! <span id="ad-text">Ad</span></p>
          {ad}
    </section>
    )
}


export default AdMovies;