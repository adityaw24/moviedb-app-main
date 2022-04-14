import React, { useState } from "react";
import {
  Badge,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
} from "@mui/material";
import ModalDetail from "./ModalDetail";
import axios from "axios";
import {
  API_KEY,
  IMAGE_UNSPLASH,
  MOVIEDB_BASE,
  MOVIEDB_IMAGE_BASE,
} from "../Config";

export default function Cards(prop) {
  const [movieDetail, setMovieDetail] = useState({});
  const [open, setOpen] = useState(false);

  // console.log(prop.movie);

  const modalOpen = async (movieID) => {
    console.log(movieID);
    const fetchDetail = MOVIEDB_BASE + `movie/ ${movieID} ?api_key=` + API_KEY;
    try {
      const response = await axios.get(fetchDetail);
      // console.log(response);
      if (response.status === 200) {
        console.log(response.status);
        console.log(response.data);
        setMovieDetail(response.data);
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   console.log("useEffect movieDetail");
  //   console.log(movieDetail.genres);
  // }, [movieDetail]);

  const modalClose = () => setOpen(false);

  const ratingClass = (rate) => {
    if (rate >= 8) {
      return "success";
    } else if (rate >= 6) {
      return "warning";
    } else {
      return "error";
    }
  };

  return (
    <>
      <Badge
        badgeContent={prop.movie.vote_average}
        color={ratingClass(prop.movie.vote_average)}
        sx={{
          margin: "1.5rem",
        }}
      >
        <Card sx={{ width: 300 }} elevation={12}>
          <CardActionArea onClick={() => modalOpen(prop.movie.id)}>
            <CardMedia
              component="img"
              image={
                prop.movie.poster_path
                  ? MOVIEDB_IMAGE_BASE + prop.movie.poster_path
                  : IMAGE_UNSPLASH
              }
              alt={prop.movie.title}
              sx={{ objectFit: "cover" }}
            />
            <CardContent>
              <Typography gutterBottom variant="button" component="div">
                {prop.movie.title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Badge>
      {movieDetail && (
        <ModalDetail
          movieDetail={movieDetail}
          modalOpen={modalOpen}
          modalClose={modalClose}
          open={open}
          handleMovie={prop.handleMovie}
        />
      )}
    </>
  );
}
