import React from 'react';

// Material UI Core Components
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Material UI Icons
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';

// import Sidebar from './sidebar.component';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  }
}));


export default function VehicleDetailPage(vehicle) {
  // pass in vehicle parameter from route here
  const classes = useStyles();

    return (
      <>
        <Grid
          container
          direction="column"
          justify="space-around"
          alignItems="center"
          spacing={1}
        >


          <Grid
            item
            justify="center"
            alignItems="center"
          >
            {vehicle.reg_no}
            <EditIcon />
          </Grid>

          <Grid item>

            <ListItem alignItems= 'flex-start'>
              <ListItemText primary= "Make: " />
              <ListItemText primary= {vehicle.make} />
            </ListItem>

            <ListItem alignItems= 'flex-start'>
              <ListItemText primary= "Model: " />
              <ListItemText primary= {vehicle.model} />
            </ListItem>

            <ListItem alignItems= 'flex-start'>
              <ListItemText primary= "Date Registered: " />
              <ListItemText primary= {vehicle.date} />
            </ListItem>

            <ListItem alignItems= 'flex-start'>
              <ListItemText primary= "Fuel Efficiency (L/km): " />
              <ListItemText primary= {vehicle.fuel_eff} />
            </ListItem>

            <ListItem alignItems= 'flex-start'>
              <ListItemText primary= "GVM: " />
              <ListItemText primary= {vehicle.gvm} />
            </ListItem>

            <ListItem alignItems= 'flex-start'>
              <ListItemText primary= "GCM: " />
              <ListItemText primary= {vehicle.gcm} />
            </ListItem>

          </Grid>

        </Grid>
      </>

    );
}
