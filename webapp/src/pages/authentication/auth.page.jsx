import React, { useState } from 'react';
import { useHistory } from 'react-router';


// Material UI Core Components
import { makeStyles } from '@material-ui/core/styles';

// Other Components
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


const AuthPage = ({ onAuth }) => {
    const classes = useStyles();

    return (
        <Router>
            <Switch>
                <Route path="/signup">
                    <SignupPage onSignUp={onAuth} />         
                </Route>
                <Route path="/login">
                    <LoginPage onLogin={onAuth}/>         
                </Route>
                <Route path="/">
                    <LoginPage onLogin={onAuth}/>                     
                </Route>
            </Switch>
        </Router>
    )
}

export default AuthPage;