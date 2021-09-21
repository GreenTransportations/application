import React, { useState, useEffect } from 'react';
import { MenuItem, Select } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import getEmissions from './emissions';
import {
    GoogleMap,
    Autocomplete,
    LoadScript,
    DirectionsService,
    DirectionsRenderer,
    Marker
} from '@react-google-maps/api';
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { FETCH } from '../../utils/fetch.util';


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
    },
    squareButton: {
        color: "white",
        borderRadius: 180,
        fontWeight: 'normal'
    }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };


const containerStyle = {
    width: '100%',
    height: '90vh',

};


const CENTRE = {
    lat: -37.81046710108333,
    lng: 144.96389711157144
};

const libraries = ['places'];

const SESSION_STORAGE_KEY_ORIGIN = "MapPage.Origin";
const SESSION_STORAGE_KEY_DESTINATION = "MapPage.Destination";


const MapPage = ({accessCode, user, onStartTrip}) => {
    const classes = useStyles();

    // Location state storage
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);

    const [prevOrigin, setPrevOrigin] = useState(null);
    const [prevDestination, setPrevDestination] = useState(null);

    const [originAutocomplete, setOriginAutocomplete] = useState(null);
    const [destinationAutocomplete, setDestinationAutocomplete] = useState(null);

    const [response, setResponse] = useState(null);
    const [shortest, setShortest] = useState(0);

    const [isFetched, setIsFetched] = useState(false);

    const [map, setMap] = useState(null);
    const [vehicles, setVehicle] = useState([]);
    const [vehicleSelection, setSelection] = useState("")
    // Current Position of User
    const [userPosition, setUserPosition] = useState({});
    // const [ libraries ] = useState(['places']);

    // For Directions
    const [duration, setDuration] = useState(null);
    const [distance, setDistance] = useState(null);
    const [seconds, setSeconds] = useState(null);

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState();

    const handleChange = (event) => {
        setSelection(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

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

    const loadSessionStorage = () => {
        const sessionStorage = window.sessionStorage;
        let sessionStorageOrigin = sessionStorage.getItem(SESSION_STORAGE_KEY_ORIGIN);
        let sessionStorageDestination = sessionStorage.getItem(SESSION_STORAGE_KEY_DESTINATION);
        if (sessionStorageOrigin) {
            sessionStorageOrigin = JSON.parse(sessionStorageOrigin);
            setOrigin(sessionStorageOrigin);
        }
        if (sessionStorageDestination) {
            sessionStorageDestination = JSON.parse(sessionStorageDestination);
            setDestination(sessionStorageDestination);
        }
    }
    useEffect(() => {
        FETCH.GET("vehicle", "all", accessCode)
            .then(async (response) => {
                if (response.ok) {
                    const data = await response.json()
                    setVehicle(data);
                    loadSessionStorage();
                    navigator.geolocation.getCurrentPosition(geoSuccess);
                    console.log(data);
                } else {
                    console.log("ERROR");
                }
            })
    }, [accessCode, user])

    const onLoad = (map) => {
        console.log("Map loaded");
    }

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, [])

    const getRouteDistance = (route) => route.legs.reduce((acc, i) => acc + i.distance.value, 0);

    const setDirectionDetail = (response) => {
        // Parse the Directions API response of Google Maps
        // to determine the total duration and distance.
        console.log(response.routes);
        const route = response.routes[shortest];
        const seconds = route.legs
                        .reduce((acc,i) => acc + i.duration.value, 0);
        const HMS = [seconds]
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
        setSeconds(seconds);
        setDuration(HMS_string);

        // Get the total distance in km
        const distance = getRouteDistance(route) / 1000; 
        setDistance(distance); // Number

    }

    const getDistance = (route) => route.legs.reduce((acc, i) => acc + i.distance.value, 0);

    const directionsCallback = (response) => {  
        if (response !== null) {
            if (response.status === 'OK') {
                setIsFetched(true);
                setDirectionDetail(response);
                setResponse(response);
                console.log("RESPONSE", response)
                const sortedRoute = response.routes
                    .map((route, index) => ({ ...route, index}))
                    .sort((a, b) => getDistance(a) >= getDistance(b))

                setShortest(sortedRoute[0].index);
            } 
        }
    }

    const onAutoLoadOrigin = (autocomplete) => {
        console.log('source autocomplete loaded');
        console.log('autocomplete: ', autocomplete);
        if (originAutocomplete === null) {
            setOriginAutocomplete(autocomplete);
        }
    }

    const onAutoPlaceChangedOrigin = () => {
        if (originAutocomplete !== null) {
            let place = originAutocomplete.getPlace()
            console.log('New origin:', place);
            let newOrigin = `${place.name}, ${place.formatted_address}`

            if (newOrigin !== prevOrigin) {
                const sessionStorage = window.sessionStorage;
                sessionStorage.setItem(SESSION_STORAGE_KEY_ORIGIN, JSON.stringify(newOrigin));

                setPrevOrigin(origin);
                setOrigin(newOrigin);
                setIsFetched(false);
            }
        } else {
            console.log('Autocomplete origin is not loaded yet!')
        }
    }

    const onAutoLoadDest = (autocomplete) => {
        console.log('dest autocomplete loaded');
        console.log('autocomplete: ', autocomplete);
        if (destinationAutocomplete === null) {
            setDestinationAutocomplete(autocomplete);
        }
    }

    const onAutoPlaceChangedDest = () => {
        if (destinationAutocomplete !== null) {
            let place = destinationAutocomplete.getPlace()
            console.log('New destination:', place);
            let newDestination = `${place.name}, ${place.formatted_address}`

            if (newDestination !== prevDestination) {
                const sessionStorage = window.sessionStorage;
                sessionStorage.setItem(SESSION_STORAGE_KEY_DESTINATION, JSON.stringify(newDestination));

                setPrevDestination(destination);
                setDestination(newDestination);
                setIsFetched(false);
            }
        } else {
            console.log('Autocomplete destination is not loaded yet!')
        }
    }

    const startTripHandle = async (e) => {
        e.preventDefault();

        const NOW = new Date();
        const END = new Date();
        END.setSeconds(END.getSeconds() + seconds);

        const vehicleObj = vehicles.filter(x => x._id === vehicleSelection);
        const emissions = getEmissions(vehicleObj, distance); // emissions function


        const tripInfo = {
            vehicles: [vehicleSelection],
            user: user._id,
            emission: emissions,
            km: distance,
            source: origin,
            destination: destination,
            stops: [],
            date: NOW,
            startTime: NOW,
            endTime: END,
            totalTime: seconds,
            isLive: true
        };

        FETCH.POST("trip", "create", accessCode, tripInfo)
            .then(async (response) => {
                if (response.ok) {
                    console.log("Created new trip");
                    onStartTrip();

                } else {
                    console.log("Error on Registering new Trip");
                }
            })
    };


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
                                placeholder="Enter Origin"
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
                                placeholder="Enter Destination"
                                variant="outlined"
                            />
                        </Autocomplete>
                    </Grid>

                    <Grid item xs={4}>
                        <InputLabel id="demo-controlled-open-select-label">Select your vehicle</InputLabel>
                        <Select
                            inputProps={{ 'aria-label': 'Without label' }}
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            style={{width: "250px",borderRadius: "5px"}}
                            variant="outlined"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            onChange={handleChange}
                            value = {vehicleSelection}
                        >
                            
                            {vehicles.map((vehicle, index) => (
                                <MenuItem key={index} value = {vehicle._id}>
                                    {vehicle.reg_no} {vehicle.make}
                                </MenuItem>
                            ))}
                            
                            
                        </Select>
                    
                    </Grid>
                    

                    <Grid item xs={2}>
                        <Button
                            style={{ borderRadius: "180px" }}
                            fullWidth

                            variant="contained"
                            color="primary"
                            className={classes.squareButton}
                            endIcon={<AddIcon />}
                            onClick={startTripHandle}
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
                                <ListItemText primary={String(distance) + " km"} />
                            </ListItem>
                        </Grid>
                    </Grid>
                }

                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={userPosition}
                    zoom={12}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    {(origin !== null && destination !== null && !isFetched)  &&
                        <DirectionsService
                            options={{
                                destination: destination,
                                origin: origin,
                                travelMode: 'DRIVING',
                                provideRouteAlternatives: true
                            }}
                            callback={directionsCallback}
                        />
                    }

                    {response !== null &&
                        <>
                            {response.routes.map((_, index) => 
                                <>
                                    {index !== shortest &&
                                        <DirectionsRenderer
                                            options={{ 
                                                directions: response, 
                                                routeIndex: index
                                            }}
                                        />
                                    }
                                </>
                            )}
                            <DirectionsRenderer
                                options={{ 
                                    directions: response, 
                                    routeIndex: shortest,
                                    polylineOptions: { strokeColor: "#078f61", strokeWeight: 5}
                                }}
                            />
                        </>
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