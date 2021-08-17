import React, { useState } from 'react';


// Material UI Core Components
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {InputAdornment, IconButton } from "@material-ui/core";


// Other Components
import { ReactComponent as GTLogo } from "../../assets/logo.svg";
import { Link } from '@material-ui/core';
import { FETCH } from '../../utils/fetch.util';

const useStyles = makeStyles((theme) => ({
    registerRow: {
        margin: "20px 0px"
    },
    registerRowIcon: {
        fontSize: "large",
        width: "2em",
        height: "2em",
        margin: "0px"
    },
    squareButton: {
        color: "white",
        borderRadius: 4,
        fontWeight: 'light'
    }
}));

const VehicleRegistrationPage({ onRegistration }) => {
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [reg_no, set_reg_no] = useState("");
    const [date, setDate] = useState("");
    const [user_reg, set_user_reg] = useState("");
    const classes = useStyles();

    const registerHandle = async (e) => {
        e.preventDefault();

        const vehicleInfo = {
            brand: brand,
            model: model,
            reg_no: reg_no,
            date: date,
            user_reg: user_reg
        };

    FETCH.POST("auth", "vehicleRegistration", "", vehicleInfo)
        .then(async (response) => {
            if (response.ok) {
                const res = await response.json();
                onRegistration(res.accessCode);
            } else {
                console.log("Error on Registration");
            }
        })
    };

    return (
        <div>
            <Grid>
                <Grid>
                    <GTLogo />
                </Grid>
                
                <Grid
                    className={classes.registerRow}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <AccountBox className={classes.registerRowIcon} />
                    <TextField
                        label="brand"
                        variant="outlined"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    />
                </Grid>

                <Grid
                    className={classes.registerRow}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <model className={classes.registerRowIcon} />
                    <TextField
                        style={{width: "223px"}}
                        type="model"
                        variant="outlined"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                    />
                </Grid>

                <Grid
                    className={classes.registerRow}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <reg_no className={classes.registerRowIcon} />
                    <TextField
                        label="reg_no"
                        variant="outlined"
                        value={reg_no}
                        onChange={(e) => set_reg_no(e.target.value)}
                    />
                </Grid>

                <Grid
                    className={classes.registerRow}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <date className={classes.registerRowIcon} />
                    <TextField
                        label="date"
                        variant="outlined"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </Grid>

                <Grid
                    className={classes.registerRow}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <user_reg className={classes.registerRowIcon} />
                    <TextField
                        label="date"
                        variant="outlined"
                        value={user_reg}
                        onChange={(e) => set_user_reg(e.target.value)}
                    />
                </Grid>
                
                <Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.squareButton}
                        onClick={registerHandle}
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

