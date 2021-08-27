import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';


// Material UI Core Components
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';

// API Key for Google Maps
import { API_KEY } from '../../data/api.key';

// Material UI Icons
import AddIcon from '@material-ui/icons/Add';
import { TextField } from '@material-ui/core';



// Material UI Icons


// Other Components


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

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: `${API_KEY.GOOGLE_ALEX}`
    });

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map);
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, [])

    const center = {
        lat: -34.397,
        lng: 150.644,
    };

    return isLoaded ? (
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
                    <GooglePlacesAutocomplete
                        apiKey={API_KEY.GOOGLE_ALEX}
                        // fullWidth
                        // id="outlined-basic"
                        // label="Start Location"
                        // variant="outlined"
                    />
                </Grid>

                <Grid
                    item
                    xs={4}
                >
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Destination Location"
                        variant="outlined"
                    ></TextField>
                </Grid>

                <Grid
                    item
                    xs={2}
                >
                    <Button
                        style = {{borderRadius: "180px"}}
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
                center={center}
                zoom={6}
                onLoad={map => onLoad(map)}
                onUnmount={onUnmount}
            >
                {}
                <></>
            </GoogleMap>
        </div>
    ) : <></>
}

export default React.memo(MapPage)