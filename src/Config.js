const movieID = "";

export const API_KEY = "a5f3f3e254c0d1ccd58fdb1da89c1f7f";

export const MOVIEDB_BASE = "https://api.themoviedb.org/3/";

export const MOVIEDB_IMAGE_BASE = "https://image.tmdb.org/t/p/original";

export const IMAGE_UNSPLASH =
  "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmlsbXxlbnwwfDF8MHx8&auto=format&fit=crop&w=original&q=60";

export const MOVIEDB_API = {
  SEARCH: `${MOVIEDB_BASE}search/movie?api_key=${API_KEY}&query=`,
  NOW_PLAYING: `${MOVIEDB_BASE}movie/now_playing?api_key=${API_KEY}&page=`,
  POPULAR: `${MOVIEDB_BASE}movie/popular?api_key=${API_KEY}&page=`,
  TRENDING_DAY: `${MOVIEDB_BASE}trending/movie/day?api_key=${API_KEY}&page=`,
  TRENDING_WEEK: `${MOVIEDB_BASE}trending/movie/week?api_key=${API_KEY}&page=`,
  COMING_SOON: `${MOVIEDB_BASE}discover/movie?api_key=${API_KEY}&sort_by=release_date.desc&page=`,
  VIDEO: `${MOVIEDB_BASE}movie/${movieID}/videos?api_key=${API_KEY}`,
  DETAIL: `${MOVIEDB_BASE}movie/${movieID}?api_key=${API_KEY}`,
  CAST: `${MOVIEDB_BASE}movie/${movieID}/credits?api_key=${API_KEY}`,
};

export const YOUTUBE_BASE = "https://www.youtube.com/embed/";
