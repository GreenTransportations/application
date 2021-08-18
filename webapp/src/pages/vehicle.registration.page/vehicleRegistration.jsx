import React, { useState } from 'react';


// Material UI Core Components
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {InputAdornment, IconButton } from "@material-ui/core";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { Link, MenuItem, Select } from '@material-ui/core';
import { ReactComponent as GTLogo } from "../../assets/logo.svg";


// Other Components


const useStyles = makeStyles((theme) => ({
    registerRow: {
        margin: "20px 0px"
    },
    squareButton: {
        color: "white",
        borderRadius: 4,
        fontWeight: 'light'
    }
}));

const VehicleRegistrationPage = ({ onRegistration }) => {
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [reg_no, set_reg_no] = useState("");
    const [date, setDate] = useState("");
    const [user_reg, set_user_reg] = useState("");
    const classes = useStyles();

    const vehicleInfo = {
        brand: brand,
        model: model,
        reg_no: reg_no,
        date: date,
        user_reg: user_reg
    };

    return (
        <div>
            <Grid>
                <Grid 
                    container
                    justify="center"
                    alignItems="center">
                    <GTLogo />
                </Grid>

                <Grid
                        className={classes.registerRow}
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        Brand:
                        <Select
                            style={{width: "223px"}}
                            label="brand"
                            variant="outlined"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
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
                            style={{width: "223px"}}
                            label="model"
                            variant="outlined"
                            value={brand}
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
                            style={{width: "223px"}}
                            type="reg_no"
                            variant="outlined"
                            value={user_reg}
                            onChange={(e) => set_user_reg(e.target.value)}
                        />
                    </Grid>

                    <Grid
                        className={classes.registerRow}
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        User Registered:
                        <TextField
                            style={{width: "223px"}}
                            type="user_reg"
                            variant="outlined"
                            value={user_reg}
                            onChange={(e) => set_user_reg(e.target.value)}
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
                            type="date"
                            variant="outlined"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </Grid>
                    
                    <Grid>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.squareButton}
                            //onClick={registerHandle}
                        >
                            Register now
                        </Button>
                    </Grid>
                <div style = {{paddingTop: "20px"}}>
                    <a>Already registered?</a>
                </div>
            </Grid>
        </div>
    )
};

export default VehicleRegistrationPage;