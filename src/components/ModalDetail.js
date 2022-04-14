import React from "react";
import {
  Typography,
  Modal,
  Stack,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import { IMAGE_UNSPLASH, MOVIEDB_IMAGE_BASE } from "../Config";
// import axios from "axios";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

export default function ModalDetail(detail) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "65%",
    // bg: "background.paper",
    background: `url(${MOVIEDB_IMAGE_BASE + detail.movieDetail.backdrop_path})`,
    // backgroundColor: "#000",
    backgroundSize: "cover",
    //   border: "2px solid #000",
    boxShadow: 24,
  };

  // console.log(detail.movieDetail);

  return (
    <div>
      <Modal
        open={detail.open}
        onClose={detail.modalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          <Box
            p={4}
            sx={{
              display: "flex",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: "30%", p: 1, m: 1 }}
              image={
                detail.movieDetail.poster_path
                  ? MOVIEDB_IMAGE_BASE + detail.movieDetail.poster_path
                  : IMAGE_UNSPLASH
              }
              alt={detail.movieDetail.title}
            />
            <CardContent>
              <Typography variant="h4" component="div" mb={3}>
                {detail.movieDetail.title}
              </Typography>
              <Typography variant="body1" component="div" mb={3}>
                {detail.movieDetail.overview}
              </Typography>
              <Stack direction="row" mb={3} spacing={14}>
                <Stack direction="column">
                  <Typography variant="body1" component="div">
                    Rating :
                  </Typography>
                  <Typography variant="body1" component="div" fontWeight="bold">
                    {detail.movieDetail.rating}
                  </Typography>
                </Stack>
                <Stack direction="column">
                  <Typography variant="body1" component="div">
                    Release Date :
                  </Typography>
                  <Typography variant="body1" component="div" fontWeight="bold">
                    {detail.movieDetail.release_date}
                  </Typography>
                </Stack>
              </Stack>
              <Typography variant="body1" component="div">
                Genre :
              </Typography>
              <Stack spacing={2} direction="row">
                {detail.movieDetail.genres &&
                  detail.movieDetail.genres.map((genre, index) => (
                    <Typography
                      key={index}
                      variant="body1"
                      component="div"
                      fontWeight="bold"
                    >
                      {genre.name}
                    </Typography>
                  ))}
              </Stack>
              <Stack direction="row" justifyContent="end" mt={3}>
                <Link to={`/${detail.movieDetail.title}`}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                      hover: { color: "white" },
                    }}
                    onClick={() => detail.handleMovie(detail.movieDetail)}
                  >
                    View Details
                  </Button>
                </Link>
              </Stack>
            </CardContent>
          </Box>
        </Card>
      </Modal>
    </div>
  );
}
