import React, { useState } from 'react';


// Material UI Core Components
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';


// Material UI Icons
import AddIcon from '@material-ui/icons/Add';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import FavoriteIcon from '@material-ui/icons/Favorite';


// Other Components
import TripTable from '../../components/table/trip.table.component';


// Style
const useStyles = makeStyles((theme) => ({
    squareButton: {
        color: "white",
        boxShadow: "none",
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
                        variant="contained"
                        color="primary"
                        className={classes.squareButton}
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
                        variant="contained"
                        color="primary"
                        className={classes.squareButton}
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
                        variant="contained"
                        color="primary"
                        className={classes.squareButton}
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