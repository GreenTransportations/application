import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Paper, Button, Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { borders } from '@material-ui/system';
import {InputAdornment, IconButton } from "@material-ui/core";
import { MenuItem, Select } from '@material-ui/core';
import { FETCH } from '../../utils/fetch.util';
import ReplayIcon from '@material-ui/icons/Replay';
const useStyles = makeStyles({
    table: {
        minWidth: 650,
        boxShadow: "none"
    },
    tableContainer: {
        boxShadow: "none",
        marginTop: "30px"

    },
    squareButton: {
        color: "white",
        borderRadius: 180,
        fontWeight: 'normal'
    }
});

const TripHistoryPage = ({ accessCode, user, trips, onSelect}) => {
    const classes = useStyles();

    return (
        <div style={{ padding: "30px" }}>
            <TableContainer  className={classes.tableContainer} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Trip ID</TableCell>
                            <TableCell>Date of Trip</TableCell>
                            <TableCell>User Who Started Trip</TableCell>
                            <TableCell>Emissions Produced</TableCell>
                            <TableCell>Distance Travelled</TableCell>
                            <TableCell>Start Time</TableCell>
                            <TableCell>End Time</TableCell>
                            <TableCell>Total Trip Time</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {trips.map((trip) => (
                            <TableRow key={trip._id} onClick={() => onSelect(trip)}>
                                <TableCell component="th" scope="row">
                                    {trip._id}
                                </TableCell>
                                <TableCell>{trip.date}</TableCell>
                                <TableCell>{trip.user}</TableCell>
                                <TableCell>{trip.emission}</TableCell>
                                <TableCell>{trip.km}</TableCell>
                                <TableCell>{trip.startTime}</TableCell>
                                <TableCell>{trip.endTime}</TableCell>
                                <TableCell>{trip.totalTime}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid
                container
                direction="row"
                justify="flex-end"
                spacing={1}
                style={{marginTop: "50px", alignContent: "right"}}
            >
            
            <Grid item>
            <Button 
                        style = {{borderRadius: "180px"}}          
                        variant="contained"
                        color="primary"
                        endIcon={<ReplayIcon />}
                        className={classes.squareButton}
                        //Find a better function to reload 
                        //onClick={() => window.location.reload(false)}
                    >
                    Reload
            </Button>
            </Grid>
            </Grid>

        </div>
    );
}

export default TripHistoryPage;