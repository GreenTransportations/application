import React, { useState } from 'react';
import clsx from 'clsx';


// Material UI Core Components
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';


// Material UI Icons
import AddIcon from '@material-ui/icons/Add';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import FavoriteIcon from '@material-ui/icons/Favorite';


// Other Components
import TripTable from '../component/table/trip.table.component';


// Style
const useStyles = makeStyles((theme) => ({
    squareGreenButton: {
        backgroundColor: "var(--gt-primary-color)",
        color: "#fff5f5",
        zIndex: 2000,
        borderRadius: 0
    }
}));


const DashboardPage = () => {
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
                    xs={3}
                >
                    <Button
                        fullWidth
                        className={clsx(classes.squareGreenButton)}
                        endIcon={<AddIcon />}
                    >
                        Start a New Trip
                    </Button>
                </Grid>
                <Grid 
                    item
                    xs={3}
                >
                    <Button
                        fullWidth
                        className={clsx(classes.squareGreenButton)}
                        endIcon={<CompareArrowsIcon />}
                    >
                        Check Trip History
                    </Button>
                </Grid>
                <Grid 
                    item
                    xs={3}
                >
                    <Button
                        fullWidth
                        className={clsx(classes.squareGreenButton)}
                        endIcon={<FavoriteIcon />}
                    >
                        Add New Shortcut
                    </Button>
                </Grid>
            </Grid>
            <TripTable />
        </div>
    )
}

export default DashboardPage;