import React, { useState, useEffect } from 'react';
import {
    GoogleMap,
    DirectionsService,
    DirectionsRenderer,
    Marker
} from '@react-google-maps/api';
import { FETCH } from '../../utils/fetch.util';


// Material UI Core Components
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid} from '@material-ui/core';


// Material UI Icons
import AddIcon from '@material-ui/icons/Add';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// Style
const useStyles = makeStyles((theme) => ({
    pageContainer: {
        paddingTop: "0px",
        margin: "0px",
        overflow: "hidden"
    },

    informationContainer: {
        bottom: "5px",
        margin: "10px 10px 20px",
        padding: "20px",
        left: "240",
        zIndex: "202",
        position: "absolute",
        width: "fit-content",
        backgroundColor: "white",
        boxShadow: "rgb(0 0 0 / 30%) 0px 1px 4px -1px"
    },
    squareButton: {
        color: "white",
        borderRadius: "20px",
        fontWeight: 'normal'
    }
}));

const containerStyle = {
    width: '100%',
    height: '100vh',

};


const NavigationLivePage = ({accessCode, user, trip, onEndTrip}) => {
    const classes = useStyles();

    const [response, setResponse] = useState(null);
    const [shortest, setShortest] = useState(0);

    const [isFetched, setIsFetched] = useState(false);

    const [map, setMap] = useState(null);
    const [userPosition, setUserPosition] = useState({});

    // For Directions
    const [duration, setDuration] = useState(null);
    const [distance, setDistance] = useState(null);
    const [seconds, setSeconds] = useState(null);


    const geoSuccess = position => {
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        setUserPosition(currentPosition);
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(geoSuccess);
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

    const endTripHandle = async (e) => {
        e.preventDefault();
        const tripInfo = {
            id: trip._id
        };

        FETCH.POST("trip", "finish", accessCode, tripInfo)
            .then(async (response) => {
                if (response.ok) {
                    const data = await response.json();
                    onEndTrip();

                } else {
                    console.log("Error on finishing existing Trip");
                }
            })
    };


    return (
        <div className={classes.pageContainer}>
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
                    <Grid item>
                        <Button
                            fullWidth

                            variant="contained"
                            color="primary"
                            className={classes.squareButton}
                            onClick={endTripHandle}
                        >
                            Finish Trip
                        </Button>
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
                {(!isFetched)  &&
                    <DirectionsService
                        options={{
                            destination: trip.destination,
                            origin: userPosition,
                            travelMode: 'DRIVING',
                            provideRouteAlternatives: true
                        }}
                        callback={directionsCallback}
                    />
                }

                {response !== null &&
                    <DirectionsRenderer
                        options={{ 
                            directions: response, 
                            routeIndex: shortest,
                            polylineOptions: { strokeColor: "#078f61", strokeWeight: 5}
                        }}
                    />
                }

                {userPosition.lat &&
                    <Marker position={userPosition} />
                }
            </GoogleMap>
        </div>
    )
}

export default React.memo(NavigationLivePage)