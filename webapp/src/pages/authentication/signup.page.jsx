import React, { useState } from 'react';


// Material UI Core Components
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


// Material UI Icons
import AccountBox from '@material-ui/icons/AccountBox';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import Today from '@material-ui/icons/Today';
import Email from '@material-ui/icons/Email';
import ContactPhone from '@material-ui/icons/ContactPhone';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';

// Other Components
import { ReactComponent as GTLogo } from "../../assets/logo.svg";
import { Link, MenuItem, Select } from '@material-ui/core';
import { FETCH } from '../../utils/fetch.util';


// Style
const useStyles = makeStyles((theme) => ({
    signupRow: {
        margin: "20px 10px"
    },
    signupRowIcon: {
        fontSize: "large",
        width: "2em",
        height: "2em",
        margin: "0px"
    },
    squareButton: {
        color: "white",
        borderRadius: 0
    }
}));


const SignupPage = ({ onSignUp }) => {
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [username, setUsername] = useState("");
    const [type, setType] = useState("DRIVER");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const classes = useStyles();

    const signupHandle = async (e) => {
        e.preventDefault();

        const userInfo = {
            username: username,
            password: password,
            name: name,
            dob: dob,
            email: email,
            mobile: mobile,
            type: type
        };

        FETCH.POST("auth", "signup", "", userInfo)
            .then(async (response) => {
                let emptyFlag = false;

                for(let registrationKey in userInfo){
                    if(userInfo[registrationKey].isEmpty){
                        emptyFlag = true;
                    }
                }
                
                if (response.ok && emptyFlag === false) {
                    const res = await response.json();
                    onSignUp(res.accessCode);
                } else {
                    setErrorMessage("Some registration details are missing!");

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
                    className={classes.signupRow}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <AccountBox className={classes.signupRowIcon} />
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Grid>
                <Grid
                    className={classes.signupRow}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Today className={classes.signupRowIcon} />
                    <TextField
                        style={{width: "223px"}}
                        type="date"
                        variant="outlined"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                    />
                </Grid>
                <Grid
                    className={classes.signupRow}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Email className={classes.signupRowIcon} />
                    <TextField
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Grid>
                <Grid
                    className={classes.signupRow}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <ContactPhone className={classes.signupRowIcon} />
                    <TextField
                        label="Mobile"
                        variant="outlined"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                </Grid>
                <Grid
                    className={classes.signupRow}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <SupervisorAccount className={classes.signupRowIcon} />
                    <Select
                        style={{width: "223px", alignItems:"left"}}
                        label="type"
                        variant="outlined"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <MenuItem
                        style = {{alignText: "left"}}
                        value={"DRIVER"}>Driver</MenuItem>
                        <MenuItem 
                        style = {{alignText: "left"}}
                        value={"MANAGER"}>Manager</MenuItem>
                    </Select>
                </Grid>
                
                <Grid
                    className={classes.signupRow}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <AccountCircleIcon className={classes.signupRowIcon} />
                    <TextField
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Grid>
                <Grid
                    className={classes.signupRow}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <LockIcon className={classes.signupRowIcon} />
                    <TextField
                        label="Password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid>

                <p style={{color:"red"}}> {errorMessage} </p>


                <Grid>
                    <Button
                    style = {{borderRadius: "180px"}}
                        variant="contained"
                        color="primary"
                        className={classes.squareButton}
                        onClick={signupHandle}
                    >
                        Sign Up
                    </Button>
                </Grid>
                <div style = {{paddingTop: "20px"}}>
                    <a>Already registered?</a>
                </div>
                <div>
                    <Link href="login">
                        Login Here
                    </Link>
                </div>
            </Grid>
        </div>
    )
}

export default SignupPage;