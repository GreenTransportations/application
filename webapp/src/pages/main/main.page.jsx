import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";


// Material UI Core Components
import { makeStyles } from '@material-ui/core/styles';


// Material UI Icons


// Other Components
import Header from '../../components/header/header.component';
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


const MainPage = ({ accessCode, user, logout}) => {
    const classes = useStyles();

    return (
        <Router>
            <Header logout={logout} />
            <div className={classes.pageContent}>
                <Switch>
                    <Route path="/dashboard">
                        <DashboardPage accessCode={accessCode} user={user}/>         
                    </Route>
                    <Route path="/trips">
                        <MapPage accessCode={accessCode} user={user}/>         
                    </Route>
                    <Route path="/tests">
                        <TestPage accessCode={accessCode} user={user}/>         
                    </Route>
                    <Route path="/profile">
                        <ProfilePage accessCode={accessCode} user={user}/>                    
                    </Route>
                    <Route path="/driverlist">
                        <DriverList accessCode={accessCode} user={user}/>                    
                    </Route>
                    <Route path="/">
                        <Redirect to="/dashboard" />     
                    </Route>
                </Switch>
            </div>

        </Router>
    )
}

export default MainPage;