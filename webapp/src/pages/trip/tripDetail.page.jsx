import React from 'react';

// Material UI Core Components
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';

// Material UI Icons
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import InboxIcon from '@material-ui/icons/Inbox';
import CloudIcon from '@material-ui/icons/Cloud';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';

// import Sidebar from './sidebar.component';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },

  paper: {
    margin: theme.spacing(12, 1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));


export default function TripDetailPage() {
  const classes = useStyles();
  const trip = {
    tripID: '#001',
    startTime: "2:00 PM Friday, 27 August 2021",
    endTime: "4:00 PM Friday, 27 August 2021",
    startLocation: "124 La Trobe St, Melbourne VIC 3000",
    endLocation: "Wellington Rd, Clayton VIC 3800",
    driver: "Loc Lien",
    vehicle: "[Brand][Model]",
    vehicleRegNo: 12345,
    Load: 10,
    fuelConsumption: 5,
    carbonEmission: 20,
  }

    return (
        <Grid
          container
          direction="column"
          justify="space-around"
          alignItems="center"
          spacing={1}
        >
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <h1>{trip.tripID}</h1>
                        

                    <ListItem alignItems= 'flex-start'>
                    <ListItemIcon>
                        <AccessTimeIcon />
                    </ListItemIcon>
                    <ListItemText primary= "Duration: " />
                    <ListItemText primary= {trip.startTime} />
                    <ListItemText primary= " / " />
                    <ListItemText primary= {trip.endTime} />
                    </ListItem>

                    <ListItem alignItems= 'flex-start'>
                    <ListItemIcon>
                        <LocationOnIcon />
                    </ListItemIcon>
                    <ListItemText primary= "Start/End Location: " />
                    <ListItemText primary= {trip.startLocation} />
                    <ListItemText primary= " / " />
                    <ListItemText primary= {trip.endLocation} />
                    </ListItem>

                    <ListItem alignItems= 'flex-start'>
                    <ListItemIcon>
                        <PermIdentityIcon />
                    </ListItemIcon>
                    <ListItemText primary= "Driver: " />
                    <ListItemText primary= {trip.driver} />
                    </ListItem>

                    <ListItem alignItems= 'flex-start'>
                    <ListItemIcon>
                        <LocalShippingIcon />
                    </ListItemIcon>
                    <ListItemText primary= "Vehicle: " />
                    <ListItemText primary= {trip.vehicle} />
                    <ListItemText primary= "    " />
                    <ListItemText primary= {trip.vehicleRegNo} />
                    </ListItem>

                    <ListItem alignItems= 'flex-start'>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary= "Load(t): " />
                    <ListItemText primary= {trip.Load} />
                    </ListItem>

                    <ListItem alignItems= 'flex-start'>
                    <ListItemIcon>
                        <LocalGasStationIcon />
                    </ListItemIcon>
                    <ListItemText primary= "Fuel Consumption(L): " />
                    <ListItemText primary= {trip.fuelConsumption} />
                    </ListItem>

                    <ListItem alignItems= 'flex-start'>
                    <ListItemIcon>
                        <CloudIcon />
                    </ListItemIcon>
                    <ListItemText primary= "Carbon Emission(kg): " />
                    <ListItemText primary= {trip.carbonEmission} />
                    </ListItem>
                </div>
            </Grid>

            <Grid>
                <div>
                    Some graph under here
                </div>
            </Grid>

        </Grid>

    );
}