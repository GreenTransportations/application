import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Paper } from '@material-ui/core';
//import { FETCH } from '../../utils/fetch.util';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
        boxShadow: "none"
    },
    tableContainer: {
        boxShadow: "none",
        marginTop: "30px"

    }
});

function createData(tripID, date, driverID, tripStats, vehicleRegNo, distance, tripIssues, emission) {
    return { tripID, date, driverID, tripStats, vehicleRegNo, distance, tripIssues, emission };
  }

const trips = [
    createData(1, '25-08-21', 3000, '9%', '1AB1CD', 20, 'some', 123 ),
    createData(2, '26-08-21', 3001, '12%', '2CF3ED', 14, 'some', 145 ),
    createData(3, '26-08-21', 3015, '5%', '1EF3CV', 25, 'some', 246 ),
    createData(4, '27-08-21', 3024, '24%', '3RG5OP', 120, 'some', 355 ),
    createData(5, '28-08-21', 3035, '9%', '3BT7GE', 105, 'some', 233 ),
  ];

const TripHistoryPage = ({ accessCode, trip }) => {
  //const [vehicles, setVehicles] = useState([]);

  const classes = useStyles();

  return (
    <div style={{ padding: "30px" }}>
        <TableContainer  className={classes.tableContainer} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Trip ID</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Driver ID</TableCell>
                        <TableCell>Trip Stats</TableCell>
                        <TableCell>Vehicle</TableCell>
                        <TableCell>Distance</TableCell>
                        <TableCell>Trip Issues</TableCell>
                        <TableCell>Emission</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {trips.map((trip) => (
                        <TableRow key={trip.tripID}>
                            <TableCell component="th" scope="row">
                                {trip.tripID}
                            </TableCell>
                            <TableCell>{trip.date}</TableCell>
                            <TableCell>{trip.driverID}</TableCell>
                            <TableCell>{trip.tripStats}</TableCell>
                            <TableCell>{trip.vehicleRegNo}</TableCell>
                            <TableCell>{trip.distance}</TableCell>
                            <TableCell>{trip.tripIssues}</TableCell>
                            <TableCell>{trip.emission}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
);
}

export default TripHistoryPage;