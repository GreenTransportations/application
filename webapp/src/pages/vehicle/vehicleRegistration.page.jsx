import React, { useState } from 'react';


// Material UI Core Components
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { borders } from '@material-ui/system';
import {InputAdornment, IconButton } from "@material-ui/core";
import { MenuItem, Select } from '@material-ui/core';
import { FETCH } from '../../utils/fetch.util';


// Other Components


const useStyles = makeStyles((theme) => ({
    registerRow: {
        margin: "20px 0px",
        borderRadius: "180px"          
    },
    squareButton: {
        color: "white",
        borderRadius: 4,
        fontWeight: 'normal'
    },
    TextField: {
        [`& fieldset`]:{
            borderRadius:30
          }
       
    }
}));

const VehicleRegistrationPage = ({ accessCode, onRegister, toVehicleList }) => {
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [date, setDate] = useState("");
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [fuelEfficiency, setFuelEfficiency] = useState("");
    const [gVM, setGVM] = useState("");
    const [gCM, setGCM] = useState("");
    const classes = useStyles();


    const registrationHandle = async (e) => {
        e.preventDefault();

        const vehicleInfo = {
            make: make,
            model: model,
            date: date,
            reg_no: registrationNumber,
            fuel_eff: fuelEfficiency,
            gvm: gVM,
            gcm: gCM
        };

        FETCH.POST("vehicle", "create", accessCode, vehicleInfo)
            .then(async (response) => {
                if (response.ok) {
                    //console.log("Created new vehicle");

                    const newVehicle = await response.json();
                    onRegister(newVehicle);

                } else {
                    console.log("Error on Registering new Vehicle");
                }
            })
    };

    return (
        <div style={{ padding: "30px" }}>
            <Grid>
                <Grid
                    className={classes.registerRow}
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    Make:
                    <Select
                        InputProps={{
                            required: true
                            }}
                        style={{width: "250px",borderRadius: "5px"}}
                        label="brand"
                        variant="outlined"
                        value={make}
                        onChange={(e) => setMake(e.target.value)}
                    >
                        <MenuItem value={"Kenworth"}>Kenworth</MenuItem>
                        <MenuItem value={"Mack"}>Mack</MenuItem>
                        <MenuItem value={"Isuzu"}>Isuzu</MenuItem>
                        <MenuItem value={"Volvo"}>Volvo</MenuItem>
                        <MenuItem value={"Scania"}>Scania</MenuItem>
                        <MenuItem value={"Hino"}>Hino</MenuItem>
                        <MenuItem value={"DAF"}>DAF</MenuItem>
                        <MenuItem value={"Western Star"}>Western Star</MenuItem>
                        <MenuItem value={"Mercedes-Benz"}>Mercedes-Benz</MenuItem>
                        <MenuItem value={"Freightliner"}>Freightliner</MenuItem>
                        <MenuItem value={"UD"}>UD</MenuItem>
                        <MenuItem value={"Cat Trucks"}>Cat Trucks</MenuItem>
                    </Select>
                </Grid>


                <Grid
                    className={classes.registerRow}
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    Model:
                    <Select
                        InputProps={{
                            required: true
                            }}
                        style={{width: "250px", borderRadius: "5px"}}
                        label="model"
                        variant="outlined"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                    >
                        <MenuItem value={"Model 1"}>Model 1</MenuItem>
                        <MenuItem value={"Model 2"}>Model 2</MenuItem>
                    </Select>
                </Grid>

                <Grid
                    className={classes.registerRow}
                    container
                    direction="column"
                    variant="outlined"
                    justify="center"
                    alignItems="center"
                >
                    Registration Number:
                    <TextField
                    InputProps={{

                        endAdornment: (
                                <InputAdornment>
                                </InputAdornment>
                        ),
                        required: true
                        }}
                        style = {{[`& fieldset`]:{width: "250px", borderRadius:180}}}
                        variant="outlined"
                        value={registrationNumber}
                        onChange={(e) => setRegistrationNumber(e.target.value)}
                    />
                   
                </Grid>

                <Grid
                    className={classes.registerRow}
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    Fuel Efficiency:
                    <TextField
                        InputProps={{

                        endAdornment: (
                                <InputAdornment>
                                    L/KM
                                </InputAdornment>
                        ),
                        required: true
                        }}
                        style = {{width: "250px",borderRadius: "180px"}}
                        variant="outlined"
                        value={fuelEfficiency}
                        onChange={(e) => setFuelEfficiency(e.target.value)}
                    />
                </Grid>

                <Grid
                    className={classes.registerRow}
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    Registration date:
                    <TextField
                        required= {true}
                        style={{width: "250px", borderRadius: "180px"}}
                        type="date"
                        variant="outlined"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </Grid>
            
            
                <Grid
                    style={{borderRadius: "180px"}}

                    className={classes.registerRow}
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    Gross Vehicle Mass:
                    <TextField
                    InputProps={{

                        endAdornment: (
                                <InputAdornment>
                                    KG
                                </InputAdornment>
                        ),
                        required: true
                        }}
                        type="number"
                        variant="outlined"
                        value={gVM}
                        onChange={(e) => setGVM(e.target.value)}
                    />
                </Grid>
                
                <Grid
                    style={{ borderRadius: "180px"}}

                    className={classes.registerRow}
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    Gross Combined mass:
                    <TextField
                        InputProps={{

                            endAdornment: (
                                    <InputAdornment>
                                        KG
                                    </InputAdornment>
                            ),
                            required: true
                            }}
                        type="number"
                        variant="outlined"
                        value={gCM}
                        onChange={(e) => setGCM(e.target.value)}
                    />
                </Grid>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    style={{marginTop: "30px"}}
                >
                    <Grid item>
                        <Button
                            style = {{borderRadius: "180px"}}          
                            variant="contained"
                            color="primary"
                            className={classes.squareButton}
                            onClick={toVehicleList}
                        >
                            Back
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            style = {{borderRadius: "180px"}}          
                            variant="contained"
                            color="primary"
                            className={classes.squareButton}
                            onClick={registrationHandle}
                        >
                            Register Vehicle
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
};

export default VehicleRegistrationPage;