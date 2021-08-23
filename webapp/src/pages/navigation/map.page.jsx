import React, { useState } from 'react';


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
    iframe: {
        border:0,
        width:"100%",
        height:"90vh",
    }
}));


const MapPage = () => {
    const classes = useStyles();
    return (
        <div
        style={{padding: "30px"}}
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
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Start Location"
                    variant="outlined"
                ></TextField>
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

            <iframe
                className={classes.iframe}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps/embed/v1/view?key=${API_KEY.GOOGLE}
                &center=-33.8569,151.2152`}>
            </iframe>
        </div>
    )
}

export default MapPage;