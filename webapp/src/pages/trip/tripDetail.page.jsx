import React, {useState, useEffect} from 'react';
import * as dayjs from 'dayjs'

import {
    GoogleMap,
    DirectionsService,
    DirectionsRenderer,
    LoadScript
} from '@react-google-maps/api';

// Material UI Core Components
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

// Material UI Icons
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// Utils
import { HMS_converter } from '../../utils/HMS.util';
import { API_KEY } from '../../data/api.key';

const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: "center",
        display: 'flex',
        '& > *': {
        margin: theme.spacing(1),
        },
    },
    squareButton: {
        color: "white",
        borderRadius: 180,
        fontWeight: 'normal'
    }
}));

const containerStyle = {
    width: '100%',
    height: '50vh',

};

const libraries = ['places'];

const TripDetailPage = ({trip, toTripHistory}) => {
    const [response, setResponse] = useState(null);
    const [shortest, setShortest] = useState(0);

    const [isFetched, setIsFetched] = useState(false);
    const [userPosition, setUserPosition] = useState({});
    const classes = useStyles();

    
    const geoSuccess = position => {
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        setUserPosition(currentPosition);
    };
    
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(geoSuccess);
    }, [])
    
    const onLoad = (map) => {
        console.log("Map loaded");
    }
    
    const getDistance = (route) => route.legs.reduce((acc, i) => acc + i.distance.value, 0);

    const directionsCallback = (response) => {  
            if (response !== null) {
                if (response.status === 'OK') {
                    setIsFetched(true);
                    setResponse(response);
                    const sortedRoute = response.routes
                        .map((route, index) => ({ ...route, index}))
                        .sort((a, b) => getDistance(a) >= getDistance(b))

                    setShortest(sortedRoute[0].index);
                } 
            }
    }

    return (
        <LoadScript googleMapsApiKey={API_KEY.GOOGLE_ALEX} libraries={libraries}>
        <div style={{ padding: "30px" }}>
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
        >
            <Grid
                container xs={6}
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={3}
            > 
                <Grid item>
                    <b>Starting Time: </b>{dayjs(trip.startTime).format('DD-MM-YYYY HH:mm')}
                </Grid>

                <Grid item>
                    <b>Ending Time: </b>{dayjs(trip.endTime).format('DD-MM-YYYY HH:mm')}
                </Grid>

                <Grid item>
                    <b>Carbon Emissions Produced: </b>{trip.emission.toFixed(4)}
                </Grid>

                <Grid item>
                    <b>Starting Location: </b>{trip.origin}
                </Grid>

                <Grid item>
                    <b>Destination: </b>{trip.destination}
                </Grid>

                <Grid item>
                    <b>Distance Travelled: </b>{trip.km.toFixed(2)}
                </Grid>
                
                <Grid item>
                    <b>Total Time Taken: </b>{HMS_converter(dayjs(trip.endTime).diff(dayjs(trip.startTime), 'second'))}
                </Grid>
            </Grid>
            <Grid
                container xs={6}
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={3}
            > 
            <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={userPosition}
                    zoom={12}
                    onLoad={onLoad}
                >
                    {(!isFetched)  &&
                        <DirectionsService
                            options={{
                                destination: trip.destination,
                                origin: trip.origin,
                                travelMode: 'DRIVING',
                                provideRouteAlternatives: true
                            }}
                            callback={directionsCallback}
                        />
                    }

                    {response !== null &&
                        <>
                            <DirectionsRenderer
                                options={{ 
                                    directions: response, 
                                    routeIndex: shortest,
                                    polylineOptions: { strokeColor: "#078f61", strokeWeight: 5}
                                }}
                            />
                        </>
                    }
                </GoogleMap>
            </Grid>
            

        </Grid>
        
        <Grid
            container
            direction="row"
            justify="flex-start"
            spacing={1}
            style={{marginTop: "50px"}}
        >
            <Grid item>
                <Button        
                    style = {{borderRadius: "180px"}}             
                    variant="contained"
                    color="primary"
                    className={classes.squareButton}
                    onClick={toTripHistory}
                >
                    Back To Trip History
                </Button>
            </Grid>
        </Grid>
        </div>
        </LoadScript>
    );
}

export default TripDetailPage;
