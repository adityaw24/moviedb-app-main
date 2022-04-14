import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "./Card";
import { Button, Stack, Typography } from "@mui/material";
import Page from "./Pagination";
import { MOVIEDB_API } from "../Config";

export default function MoviesTrending(app) {
  const [movies, setMovies] = useState([]);
  const [moviesDay, setMoviesDay] = useState(true);
  const [moviesWeek, setMoviesWeek] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [pageTrendingDay, setPageTrendingDay] = useState(1);
  const [pageTrendingWeek, setPageTrendingWeek] = useState(1);

  const moviesTrendingDay = () =>
    axios.get(MOVIEDB_API.TRENDING_DAY + `${pageTrendingDay}`).then((res) => {
      // setMoviesDay(res.data.results);
      setMoviesDay(true);
      setMoviesWeek(false);
      setMovies(res.data.results);
      setTotalPage(res.data.total_pages);
      console.log(res.data.results);
    });

  const moviesTrendingWeek = () =>
    axios.get(MOVIEDB_API.TRENDING_WEEK + `${pageTrendingWeek}`).then((res) => {
      // setMoviesWeek(res.data.results);
      setMoviesDay(false);
      setMoviesWeek(true);
      setMovies(res.data.results);
      setTotalPage(res.data.total_pages);
      console.log(res.data.results);
    });

  useEffect(() => {
    if (moviesDay) {
      moviesTrendingDay();
    } else {
      moviesTrendingWeek();
    }
    // moviesTrendingDay();
    // moviesTrendingWeek();
    window.scroll(0, 0);
    // eslint-disable-next-line
  }, [pageTrendingDay, pageTrendingWeek]);

  const handlePage = (event, value) => {
    if (moviesDay) {
      setPageTrendingDay(value);
      setPageTrendingWeek(1);
    } else {
      setPageTrendingWeek(value);
      setPageTrendingDay(1);
    }
    // setPageTrendingDay(value);
    // setPageTrendingWeek(value);
    window.scroll(0, 0);
  };

  return (
    <div>
      <Typography
        variant="h4"
        component="h1"
        textAlign="center"
        my={3}
        gutterBottom
      >
        Trending Movies
      </Typography>
      <Stack
        direction="row"
        spacing={4}
        justifyContent="center"
        sx={{ flexWrap: "wrap" }}
        mb={3}
      >
        <Button
          variant={moviesDay ? "contained" : "outlined"}
          onClick={() => moviesTrendingDay()}
        >
          Day
        </Button>
        <Button
          variant={moviesWeek ? "contained" : "outlined"}
          onClick={() => moviesTrendingWeek()}
        >
          Week
        </Button>
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        sx={{ flexWrap: "wrap" }}
      >
        {moviesDay
          ? movies.map((day) => (
              <Cards key={day.id} movie={day} handleMovie={app.handleMovie} />
            ))
          : movies.map((week) => (
              <Cards key={week.id} movie={week} handleMovie={app.handleMovie} />
            ))}
      </Stack>
      <Page
        totalPage={totalPage}
        handlePage={handlePage}
        page={moviesDay ? pageTrendingDay : pageTrendingWeek}
      />
    </div>
  );
}
