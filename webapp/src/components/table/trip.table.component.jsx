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
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

// Utils
import { HMS_converter } from '../../utils/HMS.util';


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

const TripTable = ({ accessCode, user }) => {
    const classes = useStyles();
    const [reports, setReport] = useState([]);
    const dateNow = dayjs().format('YYYY');
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);

const handleChangePage = (event, newPage) => {
    console.log(newPage, "New Page")
    setPage(newPage);
    };
function secondsToHms(d) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
    
        var hDisplay = h > 0 ? h + (h == 1 ? " H " : " H ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " M " : " M ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " S" : " S") : "";
        return hDisplay + mDisplay + sDisplay; 
    }
const handleChangeRowsPerPage = (event) => {
    console.log("Changed Rows")
    //setRowsPerPage(parseInt(event.target.value,10));
    setRowsPerPage(+event.target.value);
    setPage(0);
    };

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
        <div style={{ padding: "30px" }}>

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
                            <TableCell>{secondsToHms((report.totalTime/1000).toFixed(0))}</TableCell>
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
        </div>

    );
}

export default TripTable;