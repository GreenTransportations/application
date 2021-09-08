import React, { useState, useEffect } from 'react';
import {
    GoogleMap,
    useJsApiLoader,
    Autocomplete,
    LoadScript,
    useLoadScript,
    DirectionsService,
    DirectionsRenderer,
    Marker
} from '@react-google-maps/api';
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';


// Material UI Core Components
import { makeStyles } from '@material-ui/core/styles';
import { Button, Fade, Grid, Paper, Popper, Typography } from '@material-ui/core';

// API Key for Google Maps
import { API_KEY } from '../../data/api.key';

// Material UI Icons
import AddIcon from '@material-ui/icons/Add';
import { Input } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// Style
const useStyles = makeStyles((theme) => ({
    gmap: {
        border: 0,
        width: "100%",
        height: "90vh",
    },

    pageContainer: {
        paddingTop: "30px",
        margin: "0px",
        overflow: "hidden"
    },

    searchContainer: {
        paddingBottom: "20px",
        margin: "0px"
    },

    informationContainer: {
        bottom: "10px",
        margin: "10px 10px 25px",
        left: "240",
        zIndex: "202",
        position: "absolute",
        width: "fit-content",
        backgroundColor: "white",
        boxShadow: "rgb(0 0 0 / 30%) 0px 1px 4px -1px"
    }
}));


const containerStyle = {
    width: '100%',
    height: '90vh',

};


const CENTRE = {
    lat: -37.81046710108333,
    lng: 144.96389711157144
};

const libraries = ['places'];


const MapPage = () => {
    const classes = useStyles();

    // Location state storage
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [originAutocomplete, setOriginAutocomplete] = useState(null);
    const [destinationAutocomplete, setDestinationAutocomplete] = useState(null);
    const [response, setResponse] = useState(null);
    const [map, setMap] = useState(null);
    // Current Position of User
    const [userPosition, setUserPosition] = useState({});
    // const [ libraries ] = useState(['places']);

    // For Directions
    const [duration, setDuration] = useState(null);
    const [distance, setDistance] = useState(null);

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState();

    const handleClick = (newPlacement) => (event) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

    const geoSuccess = position => {
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        setUserPosition(currentPosition);
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(geoSuccess);
    });

    const onLoad = (map) => {
        console.log("Map loaded");
    }

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, [])

    const setDirectionDetail = (response) => {
        // Parse the Directions API response of Google Maps
        // to determine the total duration and distance.
        const legs = response.routes[0].legs;
        const HMS = [legs
                        .reduce((acc,i) => acc + i.duration.value, 0)]
                        .map(s => ({
                            h: Math.floor(s / (60*60)),
                            next_s: s % (60*60)
                        }))
                        .map(s => ({
                            ...s,
                            m: Math.floor(s.next_s / 60),
                            s: s.next_s % 60
                        }))
                        .reduce((_, i)=>  i, {});
        // Get the string
        const HMS_string = String(HMS.h) + " Hours, " + String(HMS.m) + " Minutes";
        setDuration(HMS_string);

        // Get the total distance in km
        const distance = legs.reduce((acc, i) => acc + i.distance.value, 0) / 1000; 
        setDistance(String(distance) + " km");

    }


    const directionsCallback = (response) => {
        console.log(response);

        if (response !== null) {
            if (response.status === 'OK') {
                setDirectionDetail(response);
                setResponse(response);

            } else {
                console.log("Directions Status:");
                console.log('response: ', response)
            }
        }
    }

    const onAutoLoadOrigin = (autocomplete) => {
        console.log('source autocomplete loaded');
        console.log('autocomplete: ', autocomplete);
        setOriginAutocomplete(autocomplete);
    }

    const onAutoPlaceChangedOrigin = () => {
        if (originAutocomplete !== null) {
            let place = originAutocomplete.getPlace()
            console.log('New origin:', place);
            setOrigin(`${place.name}, ${place.formatted_address}`);
        } else {
            console.log('Autocomplete origin is not loaded yet!')
        }
    }

    const onAutoLoadDest = (autocomplete) => {
        console.log('dest autocomplete loaded');
        console.log('autocomplete: ', autocomplete);
        setDestinationAutocomplete(autocomplete);
    }

    const onAutoPlaceChangedDest = () => {
        if (destinationAutocomplete !== null) {
            let place = destinationAutocomplete.getPlace()
            console.log('New destination:', place);
            setDestination(`${place.name}, ${place.formatted_address}`);
        } else {
            console.log('Autocomplete destination is not loaded yet!')
        }
    }


    return (
        <LoadScript googleMapsApiKey={API_KEY.GOOGLE_ALEX} libraries={libraries}>
            <div className={classes.pageContainer}>
                <Grid
                    container
                    className={classes.searchContainer}
                    direction="row"
                    justify="space-around"
                    spacing={1}
                >
                    <Grid item xs={4}>
                        <Autocomplete
                            onLoad={onAutoLoadOrigin}
                            onPlaceChanged={onAutoPlaceChangedOrigin}
                        >
                            <Input
                                fullWidth
                                id="origin"
                                label="Start Location"
                                variant="outlined"
                            />
                        </Autocomplete>
                    </Grid>

                    <Grid item xs={4}>
                        <Autocomplete
                            onLoad={onAutoLoadDest}
                            onPlaceChanged={onAutoPlaceChangedDest}
                        >
                            <Input
                                fullWidth
                                id="destination"
                                label="Enter Destination"
                                variant="outlined"
                            />
                        </Autocomplete>
                    </Grid>

                    <Grid item xs={2}>
                        <Button
                            style={{ borderRadius: "180px" }}
                            fullWidth

                            variant="contained"
                            color="primary"
                            className={classes.squareButton}
                            endIcon={<AddIcon />}
                            onClick={handleClick('right-start')}
                        >
                            Start Trip
                        </Button>
                    </Grid>
                </Grid>

                {response !== null &&
                    <Grid
                        container
                        className={classes.informationContainer}
                        direction="column"
                    >
                        
                        <Grid item>
                            <ListItem id="tripinfo">
                                <ListItemText primary="Estimated Time:" />
                                <ListItemText primary={duration} />
                            </ListItem>
                        </Grid>

                        <Grid item>
                            <ListItem id="tripinfo">
                                <ListItemText primary="Distance:" />
                                <ListItemText primary={distance} />
                            </ListItem>
                        </Grid>
                    </Grid>
                }

                <GoogleMap
                    mapContainerStyle={containerStyle}
                    // className={classes.gmap}
                    center={userPosition}
                    zoom={12}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    {(origin !== '' && destination !== '') &&
                        <DirectionsService
                            options={{
                                destination: destination,
                                origin: origin,
                                travelMode: 'DRIVING'
                            }}
                            callback={directionsCallback}
                        />
                    }

                    {response !== null &&
                        <DirectionsRenderer
                            options={{ directions: response }}
                        />
                    }

                    {
                        userPosition.lat &&
                        (
                            <Marker position={userPosition} />
                        )
                    }
                </GoogleMap>
            </div>
        </LoadScript>
    )
}

export default React.memo(MapPage)