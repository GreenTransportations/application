import { FETCH } from '../../utils/fetch.util';
import React, { useEffect, useState } from 'react';
import * as dayjs from 'dayjs'


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

//Initialising the attribute names 
/*
function createData(tripNumber, date, client, stats, vehicle, distance, status, emissions) {
    return { tripNumber, date, client, stats, vehicle, distance, status, emissions };
}
*/
//Hardcoding the data values in 
/*const rows = [
    createData('001', "DD-MM-YY", "1", 9, "Vh1", 20, true, 123),
    createData('002', "DD-MM-YY", "2", 11, "Vh2", 35, true, 234),
    createData('003', "DD-MM-YY", "7", -5, "Vh3", 199, false, 345),
    createData('004', "DD-MM-YY", "4", 16, "Vh1", 132, false, 456),
    createData('005', "DD-MM-YY", "5", 10, "Vh2", 12, true, 567),
];
*/

const TripTable = ({ accessCode, user }) => {
    const classes = useStyles();
    const [reports, setReport] = useState([]);
    const dateNow = dayjs().format('YYYY');
    useEffect(() => {
        FETCH.GET("report", dateNow+"/weekly", accessCode)
            .then(async (response) => {
                if (response.ok) {
                    const data = await response.json()
                    setReport(data);
                    console.log(data);
                } else {
                    console.log("ERROR");
                }
            })
    }, [accessCode, user])

    return (
        <TableContainer  className={classes.tableContainer} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><b>Week</b></TableCell>
                        <TableCell><b>Total Trip Distance</b></TableCell>
                        <TableCell><b>Total Trip Time</b></TableCell>
                        <TableCell><b>Total Produced Emissions</b></TableCell>
                        <TableCell><b>Trips Taken</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reports.map((report) => (
                        <TableRow key={report.week}>
                            <TableCell component="th" scope="row">
                                {report.week}
                            </TableCell>
                            <TableCell>{report.km}</TableCell>
                            <TableCell>{report.totalTime}</TableCell>
                            <TableCell>{report.emission}</TableCell>
                            <TableCell>{report.count}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TripTable;