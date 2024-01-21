import React, { useState } from 'react';
import '../styles.css'; // Import your CSS file


const SimilarMovies = () => {
  const [movieSearch, setMovieSearch] = useState('');
  const [userSelectedMovie, setUserSelectedMovie] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);
  const [posterSide, setPosterSide] = useState('front'); 

  const APIKEY = '9dffaa28f307b031ed7082c228edbe21';


  const movielookUp = (moviename, callback) => {
    // Fetch movie data from TMDB API based on the provided movie name
    fetch(`https://api.themoviedb.org/3/search/movie?query=${moviename}&api_key=${APIKEY}`)
      .then((res) => res.json())
      .then((res) => {
        // Extract relevant movie details from the API response
        const movieID = res.results[0].id;
        const movieTitle = res.results[0].original_title;
        const img_path = res.results[0].poster_path;
        // Invoke the callback with the extracted movie details
        callback(undefined, { movieID, movieTitle, img_path });
      })
      .catch((error) => {
        // Handle errors in fetching movie data
        callback('Error fetching movie data', undefined);
      });
  };

  // Function to get similar movies based on a movie ID
  const movieSimilar = (movieID, callback) => {
    // Fetch similar movies data from TMDB API based on the provided movie ID
    fetch(`https://api.themoviedb.org/3/movie/${movieID}/similar?language=en-US&page=1&api_key=${APIKEY}`)
      .then((res) => res.json())
      .then((res) => {
        // Invoke the callback with the retrieved similar movies data
        callback(undefined, res.results);
        console.log(res.results);
      })
      .catch((error) => {
        // Handle errors in fetching similar movies data
        callback('Error fetching similar movies data', undefined);
      });
  };


  const handleSearch = () => {
    // Clear previous data
    setUserSelectedMovie({});
    setSimilarMovies([]);
    setPosterSide('front'); 


    // Look up details for the provided movie name
    movielookUp(movieSearch, (err, res) => {
      if (err) {
        console.error('Error:', err);
        return;
      }

      // Populate user's selected movie information
      setUserSelectedMovie(res);

      // Fetch similar movies based on the selected movie ID
      movieSimilar(res.movieID, (error, res) => {
        if (error) {
          console.error(error);
        } else {
          // Set similar movies data
          setSimilarMovies(res);
        }
      });
    });
  };
  const handleToggleSide = () => {
    // Toggle between 'front' and 'back' sides
    setPosterSide((prevSide) => (prevSide === 'front' ? 'back' : 'front'));
  };

  return (
    <div>
      <h1>Movie Recs</h1>
      <label htmlFor="movieSearch">Type Any Movie</label>
      <input
        type="text"
        placeholder="Set It Off"
        id="movieSearch"
        value={movieSearch}
        onChange={(e) => setMovieSearch(e.target.value)}
      />
      <button id="search" type="submit" onClick={handleSearch}>
        Search
      </button>

      <section id="userMovie">
        <h4>Your Movie</h4>
        <p>{userSelectedMovie.movieTitle}</p>
        <p>
          {userSelectedMovie.img_path && (
            <img src={`https://image.tmdb.org/t/p/w200${userSelectedMovie.img_path}`} alt="Movie Poster" />
          )}
        </p>
      </section>

      <section id="postList">
        <h4>Your Recommendations</h4>
        {similarMovies.map((movie) => (
          <section key={movie.id} className="movie-container" onClick={handleToggleSide}>
            <div className="front-side">
            <a target="_blank" href={`https://www.imdb.com/find/?q="${movie.original_title}"`}>
                <h2>{movie.original_title}</h2>
              </a>
              <p>{movie.overview}</p>
            </div>
          </section>
        ))}
      </section>
    </div>
  );
};

export default SimilarMovies;


