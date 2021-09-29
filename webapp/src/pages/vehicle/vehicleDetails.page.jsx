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
  },
  squareButton: {
    color: "white",
    borderRadius: 180,
    fontWeight: 'normal'
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
          alignItems="center"
          spacing={1}
        >

          <Grid item>

            <ListItem alignItems= 'flex-start'>
            <ListItemText>  <b>Make: </b> </ListItemText>
              <ListItemText>{vehicle.make} </ListItemText>
            </ListItem>

            </Grid>
          <Grid item>
            <ListItem alignItems= 'flex-start'>
              <ListItemText>  <b>Model: </b> </ListItemText>
              <ListItemText>{vehicle.model} </ListItemText>
            </ListItem>

            </Grid>
          <Grid item>

            <ListItem alignItems= 'flex-start'>
              <ListItemText> <b>Registration Number: </b> </ListItemText>
              <ListItemText>{vehicle.reg_no} </ListItemText>
            </ListItem>

            </Grid>
          <Grid item>
            <ListItem alignItems= 'flex-start'>
            <ListItemText> <b>Date Registered: </b> </ListItemText>
              <ListItemText> {new Date(vehicle.date).toLocaleDateString()} </ListItemText>
            </ListItem>

            </Grid>
          <Grid item>
            <ListItem alignItems= 'flex-start'>
            <ListItemText>  <b>Fuel Efficiency: </b> </ListItemText>
              <ListItemText> {vehicle.fuel_eff} L/100KM</ListItemText>
            </ListItem>

            </Grid>
          <Grid item>
            <ListItem alignItems= 'flex-start'>
            <ListItemText>  <b>GVM: </b> </ListItemText>
              <ListItemText>{vehicle.gvm} KG </ListItemText>
            </ListItem>

            </Grid>
          <Grid item>
            <ListItem alignItems= 'flex-start'>
            <ListItemText>  <b>GCM: </b> </ListItemText>
              <ListItemText>{vehicle.gcm} KG </ListItemText>
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
                    style = {{borderRadius: "180px"}}          
                    variant="contained"
                    color="primary"
                    className={classes.squareButton}
                    onClick={toVehicleList}
                >
                    Back To Vehicle List
                </Button>
            </Grid>
        </Grid>
      </div>

    );
}

export default VehicleDetailPage;
