import { FETCH } from '../../utils/fetch.util';
import React, { useEffect, useState } from 'react';
import * as dayjs from 'dayjs'
import TextField from '@material-ui/core/TextField';
import TablePagination from '@material-ui/core/TablePagination';

import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import ReplayIcon from '@material-ui/icons/Replay';

import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Paper, Button, Grid } from '@material-ui/core';
// Utils
import { HMS_converter } from '../../utils/HMS.util';

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
    const now = new Date();
    const [endDate, setEndDate] = useState(now.toISOString().split('T')[0]);
    const [reports, setReport] = useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);

const handleChangePage = (event, newPage) => {
    console.log(newPage, "New Page")
    setPage(newPage);
    };
const handleChangeRowsPerPage = (event) => {
    console.log("Changed Rows")
    //setRowsPerPage(parseInt(event.target.value,10));
    setRowsPerPage(+event.target.value);
    setPage(0);
    };

const dateHandle = async (e) => {
    e.preventDefault();
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
            style={{width: "250px", borderRadius: "180px", paddingTop: "50px"}}
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
                    {reports
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((report) => (
                        <TableRow key={report.week}>
                            <TableCell component="th" scope="row">
                                {report.week}
                            </TableCell>
                            <TableCell>{report.km.toFixed(2)} KM</TableCell>
                            <TableCell>{HMS_converter((report.totalTime/1000).toFixed(0))}</TableCell>
                            <TableCell>{report.emission.toFixed(4)} Metric Tonnes</TableCell>
                            <TableCell>{report.count} Trips</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
                rowsPerPageOptions={[5, 10, 50]}
                component="div"
                count={reports.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                
            />
        </>

    );
}

export default ReportPage;