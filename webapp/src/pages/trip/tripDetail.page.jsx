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


const TripDetailPage = ({trip, toTripHistory}) => {
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
              <ListItemText primary="Trip ID:" />
              <ListItemText primary= {trip._id} />
            </ListItem>
        
            <Grid item>
            <ListItem alignItems= 'flex-start'>
              <ListItemText primary= "Date Trip Was Started: " />
              <ListItemText primary= {new Date(trip.date).toLocaleDateString()} />
            </ListItem>

            </Grid>

            </Grid>
          <Grid item>
            <ListItem alignItems= 'flex-start'>
              <ListItemText primary= "User Who Started Trip: " />
              <ListItemText primary= {trip.user} />
            </ListItem>

            </Grid>
          <Grid item>

            <ListItem alignItems= 'flex-start'>
              <ListItemText primary= "Carbon Emissions Produced: " />
              <ListItemText primary= {trip.emission} />
            </ListItem>

            </Grid>
          
          <Grid item>
            <ListItem alignItems= 'flex-start'>
              <ListItemText primary= "Distance Travelled: " />
              <ListItemText primary= {trip.km} />
            </ListItem>

            </Grid>
          <Grid item>
            <ListItem alignItems= 'flex-start'>
              <ListItemText primary= "Starting Time: " />
              <ListItemText primary= {trip.startTime} />
            </ListItem>

            </Grid>
          <Grid item>
            <ListItem alignItems= 'flex-start'>
              <ListItemText primary= "Ending Time: " />
              <ListItemText primary= {trip.endTime} />
            </ListItem>
            </Grid>
            <Grid item>
            <ListItem alignItems= 'flex-start'>
              <ListItemText primary= "Total Time Taken: " />
              <ListItemText primary= {trip.totalTime} />
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
