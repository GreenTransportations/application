import React from 'react';

// Material UI Core Components
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

// Material UI Icons
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  }
}));


const VehicleDetailPage = ({vehicle, toVehicleList}) => {
  const classes = useStyles();

    return (
      <div style={{ padding: "30px" }}>
        <Grid
          container
          direction="column"
          justify="space-around"
          alignItems="flex-start"
          spacing={1}
        >

          <Grid item>

            <ListItem alignItems= 'flex-start'>
              <ListItemText primary="Make:" />
              <ListItemText primary= {vehicle.make} />
            </ListItem>

            </Grid>
          <Grid item>
            <ListItem alignItems= 'flex-start'>
              <ListItemText primary= "Model: " />
              <ListItemText primary= {vehicle.model} />
            </ListItem>

            </Grid>
          <Grid item>

            <ListItem alignItems= 'flex-start'>
              <ListItemText primary= "Registration Number: " />
              <ListItemText primary= {vehicle.reg_no} />
            </ListItem>

            </Grid>
          <Grid item>
            <ListItem alignItems= 'flex-start'>
              <ListItemText primary= "Date Registered: " />
              <ListItemText primary= {new Date(vehicle.date).toLocaleDateString()} />
            </ListItem>

            </Grid>
          <Grid item>
            <ListItem alignItems= 'flex-start'>
              <ListItemText primary= "Fuel Efficiency (L/km): " />
              <ListItemText primary= {vehicle.fuel_eff} />
            </ListItem>

            </Grid>
          <Grid item>
            <ListItem alignItems= 'flex-start'>
              <ListItemText primary= "GVM: " />
              <ListItemText primary= {vehicle.gvm} />
            </ListItem>

            </Grid>
          <Grid item>
            <ListItem alignItems= 'flex-start'>
              <ListItemText primary= "GCM: " />
              <ListItemText primary= {vehicle.gcm} />
            </ListItem>

            </Grid>
          <Grid item>
          </Grid>

        </Grid>
        
        <Grid
            container
            direction="row"
            justify="flex-start"
            spacing={1}
            style={{marginTop: "50px"}}
        >
            <Grid item>
                <Button           
                    variant="contained"
                    color="primary"
                    onClick={toVehicleList}
                >
                    Back
                </Button>
            </Grid>
        </Grid>
      </div>

    );
}

export default VehicleDetailPage;
