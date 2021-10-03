import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { USER_TYPE } from '../../enums/user.enum';

// Material UI Core Components
import { makeStyles } from '@material-ui/core/styles';


// Material UI Icons


// Other Components
import Sidebar from '../../components/sidebar/sidebar.component';
import DashboardPage from '../dashboard/dashboard.page';
import TripPage from '../trip/trip.page';
import ProfilePage from '../profile/profile.page';
import DriverList from '../driverList/driverList.page';
import VehiclePage from '../vehicle/vehicle.page';
import LiveTripPage from '../live_trips/live.trip.page';
import ReportPage from '../report/report.page';
import NavigationPage from '../navigation/navigation.page';


// Style
const useStyles = makeStyles((theme) => ({
    pageContent: {
        margin: "0px 0px 0px 240px",
        height: "100vh",
    }
}));


const PAGE_ROUTES = {}

PAGE_ROUTES[USER_TYPE.DRIVER] = (accessCode, user) => (
    <Switch>
        <Route path="/dashboard">
            <DashboardPage accessCode={accessCode} user={user}/>         
        </Route>
        <Route path="/map">
            <NavigationPage accessCode={accessCode} user={user}/>         
        </Route>
        <Route path="/vehicle">
            <VehiclePage accessCode={accessCode} user={user} />
        </Route>
        <Route path="/profile">
            <ProfilePage accessCode={accessCode} user={user}/>                    
        </Route>
        <Route path="/trips">
            <TripPage accessCode={accessCode} user={user}/>                    
        </Route>
        <Route path="/">
            <Redirect to="/dashboard" />     
        </Route>
    </Switch>
);

PAGE_ROUTES[USER_TYPE.MANAGER] = (accessCode, user) => (
    <Switch>
        <Route path="/dashboard">
            <DashboardPage accessCode={accessCode} user={user}/>         
        </Route>
        <Route path="/driver/list">
            <DriverList accessCode={accessCode} user={user}/>                    
        </Route>
        <Route path="/vehicle">
            <VehiclePage accessCode={accessCode} user={user} />
        </Route>
        <Route path="/profile">
            <ProfilePage accessCode={accessCode} user={user}/>                    
        </Route>
        <Route path="/trips/live">
            <LiveTripPage accessCode={accessCode} user={user}/>                    
        </Route>
        <Route path="/report">
            <ReportPage accessCode={accessCode} user={user}/>                    
        </Route>
        <Route path="/">
            <Redirect to="/dashboard" />     
        </Route>
    </Switch>
);


const MainPage = ({ accessCode, user, logout}) => {
    const classes = useStyles();

    if (!user) {
        return <div />
    }

    return (
        <Router>
            
            <Sidebar open = {true} user={user} logout={logout} />
            <div className={classes.pageContent}>
                {PAGE_ROUTES[user.type](accessCode, user)}
            </div>
        </Router>
    )
}

export default MainPage;