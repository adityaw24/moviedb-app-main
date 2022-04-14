import Nav from "./components/Nav";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Movies from "./components/Movies";
import MoviesComingSoon from "./components/MoviesComingSoon";
import { CssBaseline } from "@mui/material";
import MoviesTrending from "./components/MoviesTrending";
import MoviesPopular from "./components/MoviesPopular";
import { MOVIEDB_API } from "./Config";
import Detail from "./components/Detail";
import { useState } from "react";

function App() {
  const [movie, setMovie] = useState({});

  const handleMovie = (movieDetail) => {
    setMovie(movieDetail);
  };

  console.log(movie);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <CssBaseline />
        <Nav SEARCH_API={MOVIEDB_API.SEARCH} />
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Movies handleMovie={handleMovie} />} />
          <Route
            path="/popular"
            element={<MoviesPopular handleMovie={handleMovie} />}
          />
          <Route
            path="/coming_soon"
            element={<MoviesComingSoon handleMovie={handleMovie} />}
          />
          <Route
            path="/trending"
            element={<MoviesTrending handleMovie={handleMovie} />}
          />
          <Route path=":movieTitle" element={<Detail movie={movie} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
