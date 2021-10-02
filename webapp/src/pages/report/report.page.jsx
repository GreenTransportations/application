import { FETCH } from '../../utils/fetch.util';
import React, { useEffect, useState } from 'react';
import * as dayjs from 'dayjs'
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import ReplayIcon from '@material-ui/icons/Replay';

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
        fontWeight: 'normal'
    }
});

const ReportPage = ({ accessCode, user }) => {
    const classes = useStyles();
    let counter = 1;
    //const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reports, setReport] = useState([]);


const dateHandle = async (e) => {
    e.preventDefault();
    const reportInfo = {
        endDate: endDate
    };
    const dateNow = dayjs(endDate).format('YYYY');
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

}

    return (
        <>
                    <TextField
                        required= {true}
                        style={{width: "250px", borderRadius: "180px"}}
                        type="date"
                        variant="outlined"
                        value={endDate}
                        onChange={(e) => {setEndDate(e.target.value); 
                            dateHandle(e)}}
                    />
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
        </>

    );
}

export default ReportPage;