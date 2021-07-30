import React, { useState } from 'react';


// Material UI Core Components
import { makeStyles } from '@material-ui/core/styles';
import { API_CONFIG } from '../../configs/api.config';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


// Material UI Icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';


// Other Components
import { ReactComponent as GTLogo } from "../../asset/logo.svg";
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import SignupPage from './signup.page';
import LoginPage from './login.page';


// Style
const useStyles = makeStyles((theme) => ({
    loginRow: {
        margin: "20px 10px"
    },
    loginRowIcon: {
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


const AuthPage = ({ onLogin }) => {
    const classes = useStyles();

    return (
        <Router>
            <Switch>
                <Route path="/signup">
                    <SignupPage onLogin={onLogin} />         
                </Route>
                <Route path="/login">
                    <LoginPage onLogin={onLogin}/>         
                </Route>
                <Route path="/">
                    <LoginPage onLogin={onLogin}/>                     
                </Route>
            </Switch>

        </Router>
    )
}

export default AuthPage;