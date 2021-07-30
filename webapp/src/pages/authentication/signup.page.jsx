import React, { useState } from 'react';
import SignupField from './SignupField';


// Material UI Core Components
import { makeStyles } from '@material-ui/core/styles';
import { API_CONFIG } from '../../configs/api.config';
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


// Other Components
import { ReactComponent as GTLogo } from "../../asset/logo.svg";


// Style
const useStyles = makeStyles((theme) => ({
    signupRow: {
        margin: "20px 10px"
    },
    signupRowIcon: {
        fontSize: "large",
        width: "2em",
        height: "2em",
        margin: "5px"
    },
    squareButton: {
        color: "white",
        borderRadius: 0
    }
}));


const SignupPage = ({ onLogin }) => {
    const vals = ["firstname", "lastname", "DOB", "email",
     "mobile", "username", "password"];
    const bettervals = [
        {attri: "firstname", icon: AccountBox},
        {attri: "lastname", icon: AccountBox},
        {attri: "DOB", icon: Today},
        {attri: "email", icon: Email},
        {attri: "mobile", icon: ContactPhone},
        {attri: "username", icon: AccountCircleIcon},
        {attri: "password", icon: LockIcon}
    ]
    const classes = useStyles();

    const signupHandle = async (e) => {
        e.preventDefault();

        const userInfo = {
            username: username,
            password: password
        }
        fetch(`${API_CONFIG.URL}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo)
        }).then(async (response) => {
            if (response.ok) {
                console.log("Server success on signup");
                const res = await response.json();
                console.log(res);
                onLogin(res.accessCode);
            } else {
                console.log("Error on Signup");
            }
        })
    };

    // TODO: Set these Grid elements using a list function.
    return (
        <div>
            <Grid
                justify="center"
                alignItems="center"
            >
                <Grid>
                    <GTLogo />
                </Grid>
                <>
                {vals.map(v => (
                    <SignupField
                    val={v.attri}
                    icon={v.icon}/>
                ))}
                </>
                <Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.squareButton}
                        onClick={signupHandle}
                    >
                        Continue
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default SignupPage;