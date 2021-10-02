import React from 'react';
import * as dayjs from 'dayjs'
import { DayJs_HMS } from '../../utils/DayJs_HMS.util';

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
function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? " H " : " H ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " M " : " M ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " S" : " S") : "";
  return hDisplay + mDisplay + sDisplay; 
} 

const TripDetailPage = ({trip, toTripHistory}) => {
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
            <ListItemText>  <b>Starting Time: </b> </ListItemText>
              <ListItemText primary= {dayjs(trip.startTime).format('DD-MM-YYYY HH:mm')} />
            </ListItem>

            </Grid>
          <Grid item>
            <ListItem alignItems= 'flex-start'>
            <ListItemText>  <b>Ending Time: </b> </ListItemText>
              <ListItemText primary= {dayjs(trip.endTime).format('DD-MM-YYYY HH:mm')} />
            </ListItem>
            </Grid>
          <Grid item>

            <ListItem alignItems= 'flex-start'>
            <ListItemText>  <b>Carbon Emissions Produced:</b> </ListItemText>
              <ListItemText> {trip.emission.toFixed(4)} Metric Tonnes </ListItemText>
            </ListItem>

            </Grid>

            <Grid item>

            <ListItem alignItems= 'flex-start'>
            <ListItemText>  <b>Starting Location:</b> </ListItemText>
              <ListItemText> {trip.origin}</ListItemText>
            </ListItem>

            </Grid>

            <Grid item>

            <ListItem alignItems= 'flex-start'>
            <ListItemText>  <b>Destination:</b> </ListItemText>
              <ListItemText> {trip.destination}</ListItemText>
            </ListItem>

            </Grid>


          
          <Grid item>
            <ListItem alignItems= 'flex-start'>
            <ListItemText>  <b>Distance Travelled: </b> </ListItemText>
              <ListItemText>{trip.km.toFixed(2)} KM </ListItemText>
            </ListItem>

            </Grid>
          
            <Grid item>
            <ListItem alignItems= 'flex-start'>
            <ListItemText>  <b>Total Time Taken: </b> </ListItemText>
              <ListItemText>{secondsToHms(dayjs(trip.endTime).diff(dayjs(trip.startTime), 'second'))}</ListItemText>
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
                    onClick={toTripHistory}
                >
                    Back To Trip History
                </Button>
            </Grid>
        </Grid>
      </div>

    );
}

export default TripDetailPage;
