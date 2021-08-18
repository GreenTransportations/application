import React from 'react';


// Material UI Core Components
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


// Style
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

function createData(tripNumber, date, client, stats, vehicle, distance, status, emissions) {
    return { tripNumber, date, client, stats, vehicle, distance, status, emissions };
}


const rows = [
    createData('001', "DD-MM-YY", "1", 9, "Vh1", 20, true, 123),
    createData('002', "DD-MM-YY", "2", 11, "Vh2", 35, true, 234),
    createData('003', "DD-MM-YY", "7", -5, "Vh3", 199, false, 345),
    createData('004', "DD-MM-YY", "4", 16, "Vh1", 132, false, 456),
    createData('005', "DD-MM-YY", "5", 10, "Vh2", 12, true, 567),
];

const TripTable = () => {
    const classes = useStyles();

    return (
        <TableContainer  className={classes.tableContainer} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Trip</TableCell>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">Client</TableCell>
                        <TableCell align="right">Trip Stats</TableCell>
                        <TableCell align="right">Vehicle Taken</TableCell>
                        <TableCell align="right">Trip Distance</TableCell>
                        <TableCell align="right">Trip Status</TableCell>
                        <TableCell align="right">Emissions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.tripNumber}>
                            <TableCell component="th" scope="row">
                                {row.tripNumber}
                            </TableCell>
                            <TableCell align="right">{row.date}</TableCell>
                            <TableCell align="right">#{row.client}</TableCell>
                            <TableCell align="right">{row.stats}%</TableCell>
                            <TableCell align="right">{row.vehicle}</TableCell>
                            <TableCell align="right">{row.distance}KM</TableCell>
                            <TableCell align="right">{row.status}</TableCell>
                            <TableCell align="right">{row.emissions}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TripTable;