import React, { useEffect, useState } from 'react';
import TablePagination from '@material-ui/core/TablePagination';

import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Paper } from '@material-ui/core';
import { FETCH } from '../../utils/fetch.util';

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

const DriverList = ({ accessCode, user }) => {
    const [drivers, setDrivers] = useState([]);
    const classes = useStyles();

    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    let counter = 1;
    
    
    useEffect(() => {
        FETCH.GET("user", "all?type=DRIVER", accessCode)
            .then(async (response) => {
                if (response.ok) {
                    const data = await response.json()
                    setDrivers(data);
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
                            <TableCell><b>Driver ID</b></TableCell>
                            <TableCell><b>Full Name</b></TableCell>
                            <TableCell><b>Average Emissions</b></TableCell>
                            <TableCell><b>Contact Number</b></TableCell>
                            <TableCell><b>Total Mileage</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {drivers
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((driver) => (
                            <TableRow key={driver._id}>
                                <TableCell component="th" scope="row">
                                    {(counter++) + (page * rowsPerPage)}
                                </TableCell>
                                <TableCell>{driver.name}</TableCell>
                                <TableCell>{driver.total.trip > 0 ? driver.total.emission / driver.total.trip : 0}</TableCell>
                                <TableCell>{driver.mobile}</TableCell>
                                <TableCell>{driver.total.mileage} KM</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 50]}
                component="div"
                count={drivers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                
            />
        </div>
    );
}

export default DriverList;