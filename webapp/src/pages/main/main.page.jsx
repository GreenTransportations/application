import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


// Material UI Core Components
import { makeStyles } from '@material-ui/core/styles';


// Material UI Icons


// Other Components
import Header from '../../components/header/header.component';
import Sidebar from '../../components/sidebar/sidebar.component';
import DashboardPage from '../dashboard/dashboard.page';
import MapPage from '../navigation/map.page';
import TestPage from '../test/test.page';
import ProfilePage from '../profile/profile.page';
import DriverList from '../driverList/driverList.page';


// Style
const useStyles = makeStyles((theme) => ({
    pageContent: {
        margin: "0px 0px 0px 240px",
        height: "100vh",
    }
}));


const MainPage = ({ accessCode, logout}) => {
    const classes = useStyles();

    return (
        <Router>
            <Header logout={logout} />
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
                    <Route path="/profile">
                        <ProfilePage />                    
                    </Route>
                    <Route path="/driverlist">
                        <DriverList />                    
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