import React from "react";

function MovieList({ searched }) {
  return (
    <>
      {searched
        .filter((movie) => movie.Poster !== "N/A")
        .map((movie) => {
          return (
            <img
              key={movie.imdbID}
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://static.displate.com/857x1200/displate/2022-04-15/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.jpg"
              }
              alt="movie-poster"
            />
          );
        })}
    </>
  );
}

export default MovieList;
