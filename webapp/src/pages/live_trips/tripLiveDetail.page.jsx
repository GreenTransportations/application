import React from 'react';
import * as dayjs from 'dayjs'

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


const LiveTripDetailPage = ({trip, toTripHistory}) => {
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
            <ListItemText>{dayjs(trip.startTime).format('DD-MM-YYYY HH:mm')}</ListItemText>
            </ListItem>

            </Grid>

            <Grid item>
            <ListItem alignItems= 'flex-start'>
            <ListItemText>  <b>Estimated Travel Distance: </b> </ListItemText>
            <ListItemText>{trip.km.toFixed(2)} KM</ListItemText>
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

export default LiveTripDetailPage;
