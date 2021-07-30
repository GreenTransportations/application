import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


// Material UI Core Components
import { makeStyles } from '@material-ui/core/styles';


// Material UI Icons


// Other Components
import Header from '../../components/header/header.component';
import DashboardPage from '../dashboard/dashboard.page';
import MapPage from '../navigation/map.page';
import TestPage from '../test/test.page';
import LoginPage from '../authentication/login.page';
import SignupPage from '../authentication/signup.page';


// Style
const useStyles = makeStyles((theme) => ({
    pageContent: {
        margin: "64px 0px 0px 240px",
        height: "calc(100vh - 64px)",
    }
}));


const MainPage = ({id}) => {
    const classes = useStyles();

    return (
        <Router>
            <Header />
            <div className={classes.pageContent}>
                <Switch>
                    <Route path="/dashboard">
                        <DashboardPage />         
                    </Route>
                    <Route path="/trips">
                        <MapPage />         
                    </Route>
                    <Route path="/tests">
                        <TestPage />         
                    </Route>
                    <Route path="/login">
                        <LoginPage />         
                    </Route>
                    <Route path="/signup">
                        <SignupPage />         
                    </Route>
                    <Route path="/">
                        <DashboardPage />                    
                    </Route>
                </Switch>
            </div>

        </Router>
    )
}

export default MainPage;