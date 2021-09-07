import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Paper, Button, Grid } from '@material-ui/core';

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
        fontWeight: 'light'
    }
});

const TripDetailPage = ({ accessCode, user}) => {
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
                       
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid
                container
                direction="row"
                justify="flex-end"
                spacing={1}
                style={{marginTop: "50px"}}
            >
            
            </Grid>
        </div>
    );
}

export default TripDetailPage;