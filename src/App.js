import React, { useState, useEffect } from 'react';
import './App.css';
import Movie from './Movie';

export default function App() {
    const [movies, setMovies] = useState('');

    useEffect(() => {
        async function _getMovies() {
            const moviesLoad = await _callApi();
            setMovies(moviesLoad);
        }
        _getMovies();
    },[]);

    const renderMovies = () => {
        const movieList = movies.map(movie => {
            return <Movie title={movie.title} poster={movie.large_cover_image} key={movie.id} />
        })
        return movieList;
    }

    const _callApi = () => {
        return fetch('https://yts.lt/api/v2/list_movies.json?sort_by=download_count')
        .then(response => response.json())
        .then(json => json.data.movies)
        .catch(err => console.log(err))
    }

    return (
        <div className="App">
            {movies ? renderMovies() : 'Loading'}
        </div>
    );
}
