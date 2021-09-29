import React from 'react';
import * as dayjs from 'dayjs'

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

const VehicleListPage = ({ accessCode, user, vehicles, onSelect, toVehicleRegistration}) => {
    const classes = useStyles();
    let counter = 1;

    return (
        <div style={{ padding: "30px" }}>
            <TableContainer  className={classes.tableContainer} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Vehicle ID</b></TableCell>
                            <TableCell><b>Make</b></TableCell>
                            <TableCell><b>Model</b></TableCell>
                            <TableCell><b>Registration Number</b></TableCell>
                            <TableCell><b>Date Registered</b></TableCell>
                            <TableCell><b>Fuel Efficiency</b></TableCell>
                            <TableCell><b>Gross Vehicle Mass</b></TableCell>
                            <TableCell><b>Gross Combined Mass</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vehicles.map((vehicle) => (
                            <TableRow key={vehicle._id} onClick={() => onSelect(vehicle)}>
                                <TableCell component="th" scope="row">
                                    {counter++}
                                </TableCell>
                                <TableCell>{vehicle.make}</TableCell>
                                <TableCell>{vehicle.model}</TableCell>
                                <TableCell>{vehicle.reg_no}</TableCell>
                                <TableCell>{dayjs(vehicle.date).format('DD-MM-YYYY')}</TableCell>
                                <TableCell>{vehicle.fuel_eff} L/100KM</TableCell>
                                <TableCell>{vehicle.gvm} KG</TableCell>
                                <TableCell>{vehicle.gcm} KG</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid
                container
                direction="row"
                justify="flex-end"
                spacing={1}
                style={{marginTop: "50px"}}
            >
                <Grid item>
                    <Button 
                        style = {{borderRadius: "180px"}}          
                        variant="contained"
                        color="primary"
                        endIcon={<AddIcon />}
                        className={classes.squareButton}
                        onClick={toVehicleRegistration}
                    >
                        Register a new Vehicle
                    </Button>
                </Grid>
                <Grid item>

                <Button 
                        style = {{borderRadius: "180px"}}          
                        variant="contained"
                        color="primary"
                    
                        endIcon={<ReplayIcon />}
                        className={classes.squareButton}
                        //Find a better function to reload 
                        //onClick={() => window.location.reload(false)}
                    >
                    Reload
            </Button>
            </Grid>

            </Grid>
        </div>
    );
}

export default VehicleListPage;