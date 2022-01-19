import { GridList, GridListTile, GridListTileBar, Typography } from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";
import Header from "../../common/header/Header";
import movie from '../../common/json/sample.json';

import './Details.css';

const Details = (props) => {

    // const [movie, setMovie] = useState({

    //     genres: [],
    //     trailer_url: "",
    //     artists: []
    // });

    const [starIcon, setStarIcon] = useState([
        {
            id: 1,
            stateId: "star1",
            color: "black"
        },
        {
            id: 2,
            stateId: "star2",
            color: "black"
        },
        {
            id: 3,
            stateId: "star3",
            color: "black"
        },
        {
            id: 4,
            stateId: "star4",
            color: "black"
        },
        {
            id: 5,
            stateId: "star5",
            color: "black"
        }
    ])

    const opts = {

        height: '300',
        width: '700',
        playerVars: {
            autoplay: 1
        }
    }


    // useEffect(() => {

    //     console.log(movie.id);

    //     //props.baseUrl + "movies/" + props.match.params.id;
    //     // fetch("http://localhost:8085/api/v1/movies/7d174a25-ba31-45a8-85b4-b06ffc9d5f8f")
    //     //     .then(async (data) => {
    //     //         if (data.ok) {
    //     //             data = await data.json();
    //     //             setMovie(data[0]);
    //     //             console.log(data[0]);
    //     //         }
    //     //     }).catch(e => console.log('Connection error', e))


    // }, []);

    const artistClickHandler = (url) => {
        window.open(url);
    };

    const starClickHandler = (id) => {

        let starIconList = [];

        for (let star of starIcon) {
            let starNode = star;
            if (star.id <= id) {
                starNode.color = 'yellow';
            }
            else {
                starNode.color = 'black';
            }
            starIconList.push(starNode);
        }
        setStarIcon(starIconList);
    }
    
    return (
        <div className="details">
            <Header id={props.match.params.id} baseUrl={props.baseUrl}
                showBookShowBtn='true' />

            <div className="back">
                <Typography>
                    <Link to='/'> &#60; Back to Home </Link>
                </Typography>
            </div>

            <div className="flex-container-detail">
                <div className="left-detail">
                    <img src={movie.poster_url} alt={movie.title} />
                </div>
                <div className="middle-details">
                    <div>
                        <Typography>
                            <span className="bold" >Gneres: </span> {movie.genres.join(',')}
                        </Typography>
                    </div>
                    <div>
                        <Typography>
                            <span className="bold" >Duration:</span> {movie.duration}
                        </Typography>
                    </div>
                    <div>
                        <Typography>
                            <span className="bold" >Release Date:</span> {new Date(movie.release_date).toDateString()}
                        </Typography>
                    </div>
                    <div>
                        <Typography>
                            <span className="bold" >Rating:</span> {movie.rating}
                        </Typography>
                    </div>
                    <div className="marginTop16">
                        <Typography>
                            <span className="bold">Plot:</span> <a href={movie.wiki_url}>Wiki Link </a> {movie.storyline}
                        </Typography>
                    </div>
                    <div className="trailer-container">
                        <Typography>
                            <span className="bold">Trailer:</span>
                        </Typography>
                        <YouTube
                            videoId={movie.trailer_url.split("?v=")[1]}
                            opts={opts}
                        // onReady={_onReady}
                        />
                    </div>
                </div>
                <div className="right-detail">
                    <Typography>
                        <span className="bold">Rate this movie: </span>
                    </Typography>
                    {starIcon.map(star => (
                        <StarBorderIcon className={star.color}
                            key={"star" + star.id}
                            onClick={() => starClickHandler(star.id)}
                        />
                    ))}

                    <div className="bold marginBotton16 marginTop16">
                        <Typography>
                            <span className="bold">Artists: </span>
                        </Typography>
                    </div>
                    <div className="paddingRight">
                        <GridList cellHeight={160} cols={2}>
                            {movie.artists != null && movie.artists.map(artist => (
                                <GridListTile className="gridTile"
                                    onClick={() => artistClickHandler(artist.wiki_url)}
                                    key={artist.id}>
                                    <img src={artist.profile_url} alt={artist.first_name + " " + artist.last_name} />
                                    <GridListTileBar title={artist.first_name + " " + artist.last_name}>
                                    </GridListTileBar>
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                </div>
            </div>
        </div>

    );

};

export default Details;