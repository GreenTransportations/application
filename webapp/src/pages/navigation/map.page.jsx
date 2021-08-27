import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Autocomplete, LoadScript } from '@react-google-maps/api';
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
    }
}));


const containerStyle = {
    width: '100%',
    height: '90vh',

};


const MapPage = () => {
    const classes = useStyles();
    // Location state storage
    const [source, setSource] = useState(null);
    const [dest, setDest] = useState(null);
    const [map, setMap] = useState(null);

    const onLoad = (map) => {
        console.log("Map loaded");

    }

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, [])

    const onAutoLoadSource = (autocomplete) => {
        console.log('source autocomplete loaded');
        console.log('autocomplete: ', autocomplete);
        setSource(autocomplete);
    }

    const onAutoPlaceChangedSource = () => {
        if (source !== null) {
            console.log('New source:');
            console.log(source.getPlace());
            setSource(source.getPlace());
        } else {
            console.log('Autocomplete source is not loaded yet!')
        }
    }

    const onAutoLoadDest = (autocomplete) => {
        console.log('dest autocomplete loaded');
        console.log('autocomplete: ', autocomplete);
        setDest(autocomplete);
    }

    const onAutoPlaceChangedDest = () => {
        if (dest !== null) {
            console.log('New destination:');
            console.log(dest.getPlace());
            setDest(dest.getPlace());
        } else {
            console.log('Autocomplete dest is not loaded yet!')
        }
    }

    const centre = {
        lat: -25.0270548,
         lng: 115.1824598
    };

    // return isLoaded ? (
    return (
        <LoadScript id="script-loader" googleMapsApiKey={API_KEY.GOOGLE_ALEX} libraries={["places"]}>
            <div
                style={{ padding: "30px" }}
            >
                <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="center"
                    spacing={1}
                >

                    <Grid
                        item
                        xs={4}
                    >
                        <Autocomplete
                            onLoad={onAutoLoadSource}
                            onPlaceChanged={onAutoPlaceChangedSource}
                        >
                            <Input
                                fullWidth
                                id="outlined-basic"
                                label="Start Location"
                                variant="outlined"
                            ></Input>
                        </Autocomplete>
                    </Grid>

                    <Grid
                        item
                        xs={4}
                    >
                        <Autocomplete
                            onLoad={onAutoLoadDest}
                            onPlaceChanged={onAutoPlaceChangedDest}
                        >
                            <Input
                                fullWidth
                                id="outlined-basic"
                                label="Enter Destination"
                                variant="outlined"
                            ></Input>
                        </Autocomplete>
                    </Grid>

                    <Grid
                        item
                        xs={2}
                    >
                        <Button
                            style={{ borderRadius: "180px" }}
                            fullWidth

                            variant="contained"
                            color="primary"
                            className={classes.squareButton}
                            endIcon={<AddIcon />}
                        >
                            Start Trip
                        </Button>
                    </Grid>
                </Grid>

                <GoogleMap
                    mapContainerStyle={containerStyle}
                    // className={classes.gmap}
                    center={centre}
                    zoom={5}
                    onLoad={map => onLoad(map)}
                    onUnmount={onUnmount}
                >
                    { }
                    <></>
                </GoogleMap>
            </div>
        </LoadScript>
    )
}

export default React.memo(MapPage)