import React, { useRef, useState } from "react";
import axios from "axios";
import MovieList from "./MovieList";

import "../styles/App.css";
import Loader from "./Loader";

function App() {
  const [searched, setSearched] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(
    "Type in the name of a movie and click on search !"
  );

  const searchBarRef = useRef(null);

  const searchMovie = async (s) => {
    const url = `https://www.omdbapi.com/?apikey=76f27438&s=${s}`;
    const response = await axios.get(url);
    setLoading(false);
    if (response.data.Response !== "False") {
      setSearched(response.data.Search);
      setShow(true);
    } else {
      setMessage("Sorry ! Movie not found. Try a different one.");
    }
  };

  return (
    <>
      <nav>
        <div
          className="logo"
          onClick={() => {
            window.location.reload();
          }}
        >
          CINEPEDIA
        </div>
        <input
          ref={searchBarRef}
          type="search"
          placeholder="Search for movies"
        />
        <button
          onClick={() => {
            if (searchBarRef.current.value !== "") {
              setLoading(true);
              searchMovie(searchBarRef.current.value);
            }
          }}
        >
          Search
        </button>
      </nav>
      <div className="movies-container">
        <div
          style={{
            display: loading ? "flex" : "none",
          }}
          className="loader-container"
        >
          {loading ? <Loader /> : ""}
        </div>
        {show ? (
          <div>
            {searched.filter((movie) => movie.Poster !== "N/A").length} results
            for "{searchBarRef.current.value}"
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              color: "#656565",
            }}
          >
            {message}
          </div>
        )}
        <div className="movies">
          <MovieList searched={searched} />
        </div>
      </div>
    </>
  );
}

export default App;
