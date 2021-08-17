import React, { useEffect, useState } from 'react';

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

const VehicleList = ({ accessCode, user }) => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    FETCH.GET("vehicle", "all", accessCode)
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json()
          setVehicles(data);
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
                        <TableCell>Vehicle ID</TableCell>
                        <TableCell>Brand</TableCell>
                        <TableCell>Model</TableCell>
                        <TableCell>Registration Number</TableCell>
                        <TableCell>Date Registered</TableCell>
                        <TableCell>Fuel Efficiency</TableCell>
                        <TableCell>User Registered</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {vehicles.map((vehicle) => (
                        <TableRow key={vehicle._id}>
                            <TableCell component="th" scope="row">
                                {vehicle._id}
                            </TableCell>
                            <TableCell>{vehicle.make}</TableCell>
                            <TableCell>{vehicle.model}</TableCell>
                            <TableCell>{vehicle.ger_no}</TableCell>
                            <TableCell>{vehicle.date}</TableCell>
                            <TableCell>{vehicle.fuel_eff}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
);
}