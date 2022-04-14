import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "./Card";
import { Stack, Typography } from "@mui/material";
import Page from "./Pagination";
import { MOVIEDB_API } from "../Config";

export default function MoviesPopular(app) {
  const [movies, setMovies] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);

  const moviesPopularity = async () =>
    await axios.get(MOVIEDB_API.POPULAR + `${page}`).then((res) => {
      setMovies(res.data.results);
      setTotalPage(res.data.total_pages);
      console.log(res.data.results);
    });

  const handlePage = (event, value) => {
    setPage(value);
    window.scroll(0, 0);
  };

  useEffect(() => {
    moviesPopularity();
    window.scroll(0, 0);
    // eslint-disable-next-line
  }, [page]);

  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        textAlign="center"
        my={3}
        gutterBottom
      >
        Popular Movies
      </Typography>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        sx={{ flexWrap: "wrap" }}
      >
        {movies.map((movie) => (
          <Cards key={movie.id} movie={movie} handleMovie={app.handleMovie} />
        ))}
      </Stack>
      <Page totalPage={totalPage} handlePage={handlePage} page={page} />
    </>
  );
}
