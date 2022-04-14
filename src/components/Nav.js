import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Drawer,
  ListItem,
  InputBase,
  Link,
  Slide,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import PropTypes from "prop-types";
import NavPage from "./NavPage";
import { MOVIEDB_API } from "../Config";
const HideOnScroll = (props) => {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    threshold: 25,
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function Nav(app) {
  const [searchList, setSearchList] = useState("");
  //   const [search, setSearch] = useState("");

  const [anchorElNav, setAnchorElNav] = useState(false);

  const handleOpenNavMenu = () => {
    setAnchorElNav(true);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(false);
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledSearch = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  const handleSubmitSearch = (e) => {
    console.log("submit");

    e.preventDefault();

    axios.get(MOVIEDB_API.SEARCH + searchList).then((res) => {
      setSearchList(res.data.results);
      console.log(res.data.results);
    });

    setSearchList("");
  };

  const handleChangeSearch = (e) => {
    setSearchList(e.target.value);
    console.log(searchList);
  };

  useEffect(() => {
    console.log("useEffect");
    // console.log(searchList);
    // axios
    //   .get(SEARCH_API + searchList)
    //   .then((res) => {
    //     setSearch(res.data.results);
    //     console.log(res);
    //   })
    //   .catch((err) => console.log(err));
  }, [searchList]);

  return (
    <HideOnScroll {...app}>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              MOVIE APP
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                id="menu-appbar"
                open={anchorElNav}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {NavPage.map((item, index) => (
                  <Link href={item.path} underline="none" key={index}>
                    <ListItem
                      button
                      key={index}
                      onClick={handleCloseNavMenu}
                      sx={{ ":hover": { color: "inherit" } }}
                    >
                      <Typography paddingX={"1.5rem"}>{item.title}</Typography>
                    </ListItem>
                  </Link>
                ))}
              </Drawer>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              MOVIE APP
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {NavPage.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  underline="none"
                  variant="inherit"
                  color="white"
                  sx={{ ":hover": { color: "inherit" } }}
                >
                  <ListItem
                    button
                    key={index}
                    onClick={handleCloseNavMenu}
                    sx={{
                      textAlign: "left",
                    }}
                  >
                    <Typography>{item.title}</Typography>
                  </ListItem>
                </Link>
              ))}
            </Box>
            <Box
              sx={{ flexGrow: 0 }}
              component="form"
              onSubmit={handleSubmitSearch}
            >
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledSearch
                  type="search"
                  name="search"
                  placeholder="Search"
                  inputProps={{ "aria-label": "search" }}
                  value={searchList}
                  onChange={handleChangeSearch}
                  autoFocus={true}
                />
              </Search>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
}
