import React, { useState } from 'react';


// Material UI Core Components
import { makeStyles } from '@material-ui/core/styles';
import { API_KEY } from '../../data/api.key';


// Material UI Icons


// Other Components


// Style
const useStyles = makeStyles((theme) => ({
    iframe: {
        border:0,
        width:"100%",
        height:"100%",
    }
}));


const MapPage = () => {
    const classes = useStyles();
    return (
        <iframe
            className={classes.iframe}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/view?key=${API_KEY.GOOGLE}
            &center=-33.8569,151.2152`}>
        </iframe>
    )
}

export default MapPage;