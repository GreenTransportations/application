import { FETCH } from '../../utils/fetch.util';
import React, { useEffect, useState } from 'react';
import * as dayjs from 'dayjs'
import TextField from '@material-ui/core/TextField';
import TablePagination from '@material-ui/core/TablePagination';

import { makeStyles } from '@material-ui/core/styles';

import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Paper } from '@material-ui/core';
// Utils
import { HMS_converter } from '../../utils/HMS.util';

// PDF
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ReportPDF } from './report.pdf';

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
    const now = new Date();
    const [endDate, setEndDate] = useState(now.toISOString().split('T')[0]);
    const [reports, setReport] = useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        let endDate = new Date().toISOString().split('T')[0];
        const dateNow = dayjs(endDate).format('YYYY');
        FETCH.GET("report", dateNow + "/weekly", accessCode)
            .then(async (response) => {
                if (response.ok) {
                    const data = await response.json()
                    setReport(data);
                } else {
                    console.log("ERROR");
                }
            });
    }, [accessCode, user])

    const dateHandle = async (e) => {
        // e.preventDefault();
        const dateNow = dayjs(endDate).format('YYYY');
        FETCH.GET("report", dateNow + "/weekly", accessCode)
            .then(async (response) => {
                if (response.ok) {
                    const data = await response.json()
                    setReport(data);
                } else {
                    console.log("ERROR");
                }
            });
    }

    return (
        <div style={{ padding: "30px" }}>
            <TextField
                required={true}
                style={{ width: "250px", borderRadius: "180px", paddingTop: "50px" }}
                type="date"
                variant="outlined"
                value={endDate}
                onChange={(e) => {
                    setEndDate(e.target.value);
                    dateHandle(e)
                }}
            />
            <TableContainer className={classes.tableContainer} component={Paper}>
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
                                    <TableCell>{HMS_converter((report.totalTime / 1000).toFixed(0))}</TableCell>
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

            {reports && (reports.length > 0) && 
            <PDFDownloadLink document={<ReportPDF reports={reports} endDate={endDate} />} fileName="emissions-summary.pdf">
                {({blob, url, loading, error}) => 
                    loading ? 'Loading Document...' : 'Download PDF Summary'
                }

            </PDFDownloadLink>
            }
        </div>

    );
}

export default ReportPage;