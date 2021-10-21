import { FETCH } from '../../utils/fetch.util';
import React, { useEffect, useState } from 'react';
import * as dayjs from 'dayjs'
import TextField from '@material-ui/core/TextField';
import TablePagination from '@material-ui/core/TablePagination';

import { makeStyles } from '@material-ui/core/styles';

import {
    BarChart,
    Bar,
    Brush,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Label,
} from 'recharts';

import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    Paper,
    Grid,
    Button
} from '@material-ui/core';
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
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 0);
    const [startDate, setStartDate] = useState(lastMonth.toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(now.toISOString().split('T')[0]);
    const [reports, setReport] = useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);

    const width = window.innerWidth;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const dateHandle = async (startDate, endDate) => {
        // e.preventDefault();
        const dateNow = dayjs(endDate).format('YYYY');
        let startDateQuery = `startDate=${new Date(startDate).toISOString().split('T')[0]}`;
        let endDateQuery = `endDate=${new Date(endDate).toISOString().split('T')[0]}`;
        FETCH.GET("report", `${dateNow}/weekly?${startDateQuery}&${endDateQuery}`, accessCode)
            .then(async (response) => {
                if (response.ok) {
                    const data = await response.json()
                    setReport(data);
                } else {
                    console.log("ERROR");
                }
            });
    }

    useEffect(() => {
        const now = new Date();
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 0);
        dateHandle(lastMonth, now);
    }, [accessCode, user])

    return (
        <div style={{ padding: "30px" }}>
            <TextField
                required={true}
                style={{ width: "250px", borderRadius: "180px", paddingTop: "5px" }}
                type="date"
                variant="outlined"
                value={startDate}
                onChange={(e) => {
                    if (new Date(e.target.value) <= new Date(endDate)) {
                        setStartDate(e.target.value);
                        dateHandle(e.target.value, endDate)
                    }
                }}
            />
            <TextField
                required={true}
                style={{ width: "250px", borderRadius: "180px", paddingTop: "5px" }}
                type="date"
                variant="outlined"
                value={endDate}
                onChange={(e) => {
                    if (new Date(e.target.value) >= new Date(startDate)) {
                        setEndDate(e.target.value);
                        dateHandle(startDate, e.target.value)
                    }
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

            <Grid
                container
                direction="row"
                spacing={1}
                justify="space-around"
                alignItems="center"
            >

                <Grid
                    item
                >
                    <BarChart
                        width={width/2}
                        height={400}
                        data={reports}
                        margin={{
                            top: 5,
                            right: 0,
                            left: 0,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <Brush dataKey="name" height={40} stroke="#078f61" />
                        <XAxis dataKey="week">
                            <Label value="Week of the Year" offset={-25} position="insideBottom" />
                        </XAxis>
                        <YAxis dataKey="emission">
                            <Label value="C02 (metric tonnes)" angle={-90} position="insideLeft" />
                        </YAxis>
                        <Tooltip offset={30} />
                        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                        <Bar dataKey="emission" fill="#078f61" />
                    </BarChart>
                </Grid>
            </Grid>

            {reports && (reports.length > 0) &&
                <PDFDownloadLink document={<ReportPDF reports={reports} endDate={endDate} />} fileName="emissions-summary.pdf">
                    {({ blob, url, loading, error }) =>
                        loading ? 'Loading Document...' : 'Download PDF Summary'
                    }

                </PDFDownloadLink>
            }
        </div>

    );
}

export default ReportPage;