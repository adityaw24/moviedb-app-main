import {
  Stack,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  CardActionArea,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  API_KEY,
  IMAGE_UNSPLASH,
  MOVIEDB_BASE,
  MOVIEDB_IMAGE_BASE,
} from "../Config";
import styled from "styled-components";
import YouTube from "react-youtube";

export default function Detail(detail) {
  const [casts, setCasts] = useState([]);
  const [videos, setVideos] = useState([]);
  const [watchProviders, setWatchProviders] = useState([]);

  const castAPI =
    MOVIEDB_BASE + `movie/${detail.movie.id}/credits?api_key=` + API_KEY;
  const videoAPI =
    MOVIEDB_BASE + `movie/${detail.movie.id}/videos?api_key=` + API_KEY;
  const watchAPI =
    MOVIEDB_BASE +
    `movie/${detail.movie.id}/watch/providers?api_key=` +
    API_KEY;

  const fetchCast = async () => {
    try {
      const response = await axios.get(castAPI);
      if (response.status === 200) {
        console.log(response.data);
        setCasts(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchVideo = async () => {
    try {
      const response = await axios.get(videoAPI);
      if (response.status === 200) {
        console.log(response.data.results);
        setVideos(response.data.results);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchWatchNow = async () => {
    try {
      const response = await axios.get(watchAPI);
      if (response.status === 200) {
        console.log(response.data);
        setWatchProviders(response.data.results.GB.flatrate);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCast();
    fetchVideo();
    fetchWatchNow();
    console.log(videos);
    console.log(watchProviders);
    // eslint-disable-next-line
  }, []);

  const style = {
    background: `url(${MOVIEDB_IMAGE_BASE + detail.movie.backdrop_path})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    p: 0,
  };

  const CarouselContainer = styled.div`
    display: flexbox;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow-x: auto;
    padding: 1rem 0;
  `;

  const youtubeOpt = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      controls: 1,
      cc_load_policy: 0,
      fs: 0,
      iv_load_policy: 0,
      modestbranding: 0,
      rel: 1,
      showinfo: 0,
    },
  };

  //   const onReady = (event) => {
  //     // access to player in all event handlers via event.target
  //     event.target.pauseVideo();
  //   };

  return (
    <div>
      <Card sx={style}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            m: 0,
            p: 0,
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: "30%" }}
            image={
              detail.movie.poster_path
                ? MOVIEDB_IMAGE_BASE + detail.movie.poster_path
                : IMAGE_UNSPLASH
            }
            alt={detail.movie.title}
          />
          <CardContent>
            <Box mx={5} my={3}>
              <Typography variant="h3" fontWeight="bold" component="div" mb={3}>
                {detail.movie.title}
              </Typography>
              <Typography variant="h6" component="div" mb={3}>
                {detail.movie.overview}
              </Typography>
              <Stack direction="row" mb={3} spacing={14}>
                <Stack direction="column">
                  <Typography variant="h6" component="div">
                    Rating :
                  </Typography>
                  <Typography variant="h6" component="div" fontWeight="bold">
                    {detail.movie.vote_average}
                  </Typography>
                </Stack>
                <Stack direction="column">
                  <Typography variant="h6" component="div">
                    Release Date :
                  </Typography>
                  <Typography variant="h6" component="div" fontWeight="bold">
                    {detail.movie.release_date}
                  </Typography>
                </Stack>
              </Stack>
              <Typography variant="h6" component="div">
                Genre :
              </Typography>
              <Stack spacing={2} direction="row" mb={3}>
                {detail.movie.genres &&
                  detail.movie.genres.map((genre, index) => (
                    <Typography
                      key={index}
                      variant="h6"
                      component="div"
                      fontWeight="bold"
                    >
                      {genre.name}
                    </Typography>
                  ))}
              </Stack>
              <Typography variant="h6" component="div" mb={2}>
                Watch Now
              </Typography>
              <Stack spacing={2} direction="row">
                {watchProviders &&
                  watchProviders.map((provider, index) => (
                    <Card key={index} sx={{ width: 100 }}>
                      <CardActionArea>
                        <Tooltip title={provider.provider_name} arrow>
                          <CardMedia
                            component="img"
                            image={
                              provider.logo_path
                                ? MOVIEDB_IMAGE_BASE + provider.logo_path
                                : IMAGE_UNSPLASH
                            }
                            alt={provider.provider_name}
                          />
                        </Tooltip>
                      </CardActionArea>
                    </Card>
                  ))}
              </Stack>
            </Box>
          </CardContent>
        </Stack>
      </Card>
      <Box mx={5} my={3}>
        <Typography
          variant="h5"
          component="div"
          sx={{ textAlign: "left", mx: 2, mt: "4rem", fontWeight: "bold" }}
        >
          Cast & Crew
        </Typography>
        <CarouselContainer>
          {casts.cast &&
            casts.cast.map((actor, index) => (
              <Card key={index} sx={{ width: 200, m: 2 }}>
                <CardMedia
                  component="img"
                  image={
                    actor.profile_path
                      ? MOVIEDB_IMAGE_BASE + actor.profile_path
                      : IMAGE_UNSPLASH
                  }
                  alt={actor.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ height: 100 }}>
                  <Typography variant="body2" mb={1} component="div">
                    {actor.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    component="div"
                    sx={{ fontSize: "0.7rem" }}
                  >
                    {actor.character}
                  </Typography>
                </CardContent>
              </Card>
            ))}
        </CarouselContainer>
      </Box>
      <Box mx={5} my={3}>
        <Typography
          variant="h5"
          component="div"
          sx={{ textAlign: "left", mx: 2, mt: "4rem", fontWeight: "bold" }}
        >
          Movie Trailer & Teaser
        </Typography>
        <CarouselContainer>
          {videos &&
            videos.map(
              (video, index) =>
                (video.type === "Teaser" && (
                  <Box m={2} key={index}>
                    <YouTube
                      videoId={video.key}
                      id={video.id}
                      opts={youtubeOpt}
                    />
                  </Box>
                )) ||
                (video.type === "Clip" && (
                  <Box m={2} key={index}>
                    <YouTube
                      videoId={video.key}
                      id={video.id}
                      opts={youtubeOpt}
                    />
                  </Box>
                ))
            )}
          {/* {videos &&
            videos.map(
              (video, index) =>
                video.type === "Teaser" && (
                  <iframe
                    key={index}
                    width="640"
                    height="390"
                    src={YOUTUBE_BASE + video.key}
                    title={video.name}
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  />
                )
            )} */}
        </CarouselContainer>
      </Box>
    </div>
  );
}
