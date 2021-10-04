import React from 'react';
import * as dayjs from 'dayjs'
import TablePagination from '@material-ui/core/TablePagination';

import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Paper, Button, Grid } from '@material-ui/core';
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


const TripLivePage = ({ accessCode, user, trips, onSelect}) => {
    const classes = useStyles();
    let counter = 1;
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div style={{ padding: "30px" }}>
            <TableContainer  className={classes.tableContainer} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Trip ID</b></TableCell>
                            <TableCell><b>Start Time</b></TableCell>
                            <TableCell><b>Estimated Travel Distance</b></TableCell>
                            <TableCell><b>Starting Location</b></TableCell>
                            <TableCell><b>Destination</b></TableCell>


                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {trips
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((trip) => (
                            <TableRow key={trip._id} onClick={() => onSelect(trip)}>
                                <TableCell component="th" scope="row">
                                    {counter++}
                                </TableCell>
                                <TableCell>{dayjs(trip.startTime).format('DD-MM-YYYY HH:mm')}</TableCell>
                                <TableCell>{trip.km.toFixed(2)} KM</TableCell>
                                <TableCell>{trip.origin}</TableCell>
                                <TableCell>{trip.destination}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 50]}
                component="div"
                count={trips.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}             
            />
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

export default TripLivePage;