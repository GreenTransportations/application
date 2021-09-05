import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Autocomplete, LoadScript, DirectionsService,DirectionsRenderer } from '@react-google-maps/api';
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';


// Material UI Core Components
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';

// API Key for Google Maps
import { API_KEY } from '../../data/api.key';

// Material UI Icons
import AddIcon from '@material-ui/icons/Add';
import { TextField, Input } from '@material-ui/core';

// Style
const useStyles = makeStyles((theme) => ({
    gmap: {
        border: 0,
        width: "100%",
        height: "90vh",
    },

    pageContainer: { 
        paddingTop: "30px", 
        margin:"0px", 
        overflow:"hidden"
    },

    searchContainer: { 
        paddingBottom: "20px", 
        margin:"0px" 
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


const MapPage = () => {
    const classes = useStyles();

    // Location state storage
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [originAutocomplete, setOriginAutocomplete] = useState(null);
    const [destinationAutocomplete, setDestinationAutocomplete] = useState(null);
    const [response, setResponse] = useState(null);
    const [map, setMap] = useState(null);

    const onLoad = (map) => {
        console.log("Map loaded");
    }

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, [])

    
    const directionsCallback = (response) => {
        console.log(response);

        if (response !== null) {
            if (response.status === 'OK') {
                setResponse(response);
            } else {
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
        <LoadScript id="script-loader" googleMapsApiKey={API_KEY.GOOGLE_ALEX} libraries={["places"]}>
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
                            // onClick={startTripHandler}
                        >
                            Start Trip
                        </Button>
                    </Grid>
                </Grid>

                <GoogleMap
                    mapContainerStyle={containerStyle}
                    // className={classes.gmap}
                    center={CENTRE}
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
                </GoogleMap>
            </div>
        </LoadScript>
    )
}

export default React.memo(MapPage)