import './Home.css';
import React, { useEffect, useState } from "react";
import GridList from '@material-ui/core/GridList';
import Header from "../../common/header/Header";
import { Button, Card, CardContent, Checkbox, FormControl, GridListTile, GridListTileBar, Input, InputLabel, ListItemText, MenuItem, Select, TextField, Typography } from "@material-ui/core";


const Home = (props) => {

    const [moviename, setMovieName] = useState();
    const [releaseDateStart, setReleaseDateStart] = useState();
    const [releaseDateEnd, setReleaseDateEnd] = useState();
    const [upcomingmovies, setUpcomingMovies] = useState([]);
    const [releasedmovies, setReleaseMovies] = useState([]);
    const [generList, setGenresList] = useState([]);
    const [genres, setGenres] = useState([]);
    const [artistList, setArtistList] = useState([]);
    const [artists, setAstists] = useState([]);


    useEffect(() => {
        let dataUpMovies = null, dataReleasedMovies = null, dataGenres = null, dataArtists = null;

     
        fetch(props.baseUrl + "movies?status=PUBLISHED", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },
            body: dataUpMovies,
        })
            .then((response) => response.json())
            .then((response) => {
                setUpcomingMovies(response.movies);
            });


        fetch(props.baseUrl + "movies?status=RELEASED", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },
            body: dataReleasedMovies,
        })
            .then((response) => response.json())
            .then((response) => {
                setReleaseMovies(response.movies);
            });

        fetch(props.baseUrl + "genres", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },
            body: dataGenres,
        })
            .then((response) => response.json())
            .then((response) => {
                setGenresList(response.genres);
            });

        fetch(props.baseUrl + "artists", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },
            body: dataArtists,
        })
            .then((response) => response.json())
            .then((response) => {
                setArtistList(response.artists);
            });

    }, []);


    const inputMovieNameChangeHandler = (event) => {
        setMovieName(event.target.value);
    }

    const genreSelectHandler = (event) => {
        setGenres(event.target.value);
    }

    const artistSelectHandler = (event) => {
        setAstists(event.target.value);
    }

    const inputDateStartChangeHandler = (event) => {
        setReleaseDateStart(event.target.value);
    }

    const inputDateEndChangeHandler = (event) => {
        setReleaseDateEnd(event.target.value);
    }


    const movieClickHandler = (id) => {
        props.history.push('movie/' + id);
    }

    const filterApplyHandler = () => {
        let dataReleasedMovies = null;

        let queryString= "?status=RELEASED";
        if(moviename !== "")
        {
            queryString += "&title=" + moviename;
        }
        if(genres.length > 0){
            queryString += "&genres=" + genres.toString();
        }
        if(artists.length > 0){
            queryString += "&artists=" + artists.toString();
        }
        if(releaseDateStart !== ""){
            queryString += "&start_date=" + releaseDateStart;
        }
        if(releaseDateEnd !== ""){
            queryString += "&end_date=" + releaseDateEnd;
        }

        fetch(props.baseUrl + "movies" + encodeURI(queryString), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },
            body: dataReleasedMovies,
        })
            .then((response) => response.json())
            .then((response) => {
                setReleaseMovies(response.movies);
            });
    }

    return (

        <div className="home">
            <Header baseUrl={props.baseUrl} />

            <div className="upcoming-movies-heading">
                <span>Upcoming Movies</span>
            </div>

            <GridList cols={6} spacing={8} style={{ flexWrap: 'nowrap', transform: 'translateZ(0)', margin: 'auto'}}
                className="grid-upcoming-movies">
                {upcomingmovies.map(movies => (

                    <GridListTile key={"upcoming" + movies.id}>
                        <img src={movies.poster_url} className="movie_poster" alt={movies.title} />
                        <GridListTileBar title={movies.title} />
                    </GridListTile>
                ))}
            </GridList>



            <div className="flex-container">
                <div className="split left">
                    <GridList cellHeight={350} cols={4} className="grid-released-movies">

                        {releasedmovies.map(movie => (

                            <GridListTile onClick={() => movieClickHandler(movie.id)}
                                className="released-movie-grid-item" key={"grid" + movie.id}>
                                <img src={movie.poster_url} className="movie_poster" alt={movie.title} />
                                <GridListTileBar title={movie.title}
                                    subtitle={<span>Release Date: {new Date(movie.release_date).toDateString()}</span>} />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
                <div className="split right">
                    <Card className= "find-by-card">
                        <CardContent className= "find-card-content">
                            <FormControl className="form-control-find">
                                <Typography className="find-by" color="textSecondary">
                                    FIND MOVIE BY:
                                </Typography>
                            </FormControl>
                            <br /> <br />

                            <FormControl className="form-control-movie-name">
                                <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                                <Input id="movieName" moviename={moviename} onChange={inputMovieNameChangeHandler} />
                            </FormControl>
                            <br /> <br />

                            <FormControl className="form-control-genres">
                                <InputLabel htmlFor="select-multiple-checkbox">Genres</InputLabel>
                                <Select
                                    multiple
                                    autoWidth={true}
                                    style={{width:'auto'}}
                                    input={<Input id="select-multiple-checkbox-genres" />}
                                    renderValue={selected => selected.join(',')}
                                    value={genres}
                                    onChange={genreSelectHandler}
                                >

                                    {generList.map(genre => (
                                        <MenuItem key={genre.genreid} value={genre.genre}>
                                            <Checkbox checked={genres.indexOf(genre.genre) > -1} />
                                            <ListItemText primary={genre.genre} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <br /> <br />
                            <FormControl className="form-control-artist">
                                <InputLabel htmlFor="select-multiple-checkbox">Artists</InputLabel>
                                <Select
                                    multiple
                                    autoWidth={true}
                                    input={<Input id="select-multiple-checkbox-artist" />}
                                    renderValue={selected => selected.join(',')}
                                    value={artists}
                                    onChange={artistSelectHandler}
                                >
                                    {artistList.map(artist => (
                                        <MenuItem key={artist.artistid} value={artist.first_name + " " + artist.last_name}>

                                            <Checkbox checked={artists.indexOf(artist.first_name + " " + artist.last_name) > -1} />
                                            <ListItemText primary={artist.first_name + " " + artist.last_name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <br /> <br />

                            <FormControl className="formcontrol-release-date-start">
                                <TextField id="relese-date-start-field"
                                    label="Release Start Date"
                                    type="date"
                                    defaultValue=""
                                    InputLabelProps={{ shrink: true }}
                                    onChange={inputDateStartChangeHandler}
                                >
                                </TextField>
                            </FormControl>
                            <br /> <br />

                            <FormControl className="formcontrol-release-date-end">
                                <TextField id="relese-date-end-field"
                                    label="Release Start End"
                                    type="date"
                                    defaultValue=""
                                    InputLabelProps={{ shrink: true }}
                                    onChange={inputDateEndChangeHandler}
                                >
                                </TextField>
                            </FormControl>
                            <br /> <br />

                            <FormControl className="formcontrol-apply-filter">
                                <Button className="apply-filter-btn" onClick={()=> filterApplyHandler()}
                                    variant="contained" color="primary">
                                    APPLY
                                </Button>
                            </FormControl>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>

    );
};

export default Home;