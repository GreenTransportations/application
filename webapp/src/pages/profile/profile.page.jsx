import React from 'react';

// Material UI Core Components
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

// Material UI Icons
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EmailIcon from '@material-ui/icons/Email';
import BusinessIcon from '@material-ui/icons/Business';
import PhoneIcon from '@material-ui/icons/Phone';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import { USER_TYPE } from '../../enums/user.enum';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },

  profileAvatar: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  }
}));


const ProfilePage = ({accessCode, user}) => {
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

          <Grid
            item
            justify="center"
            alignItems="center"
            style={{marginTop:"50px"}}
          >
            <Avatar alt="Loc Lien" src="/src/assets/logo_invert.svg" className={classes.profileAvatar} />
          </Grid>

          <Grid
            item
            justify="center"
            alignItems="center"
          >
            <h2>{user.name}</h2>
            <p>Registered {user.type === USER_TYPE.DRIVER ? "Driver": "Manager"}</p>
          </Grid>

          <Grid
            container
            direction="column"
            alignItems="baseline"
            spacing={1}
            style={{paddingLeft:"calc((90% - 240px)/2)"}}
          >
            <Grid item>
              <ListItem>
                Date Of Birth: {new Date(user.DOB).toDateString()}
              </ListItem>
            </Grid>

            <Grid item>
              <ListItem>
                Email: {user.email}
              </ListItem>
            </Grid>

            <Grid item>
              <ListItem>
                Mobile: {user.mobile}
              </ListItem>
            </Grid>

            <Grid item>
              <ListItem>
                User Type: {user.type}
              </ListItem>
            </Grid>
            {user.type === USER_TYPE.DRIVER &&
              <>
                <Grid item>
                  <ListItem>
                    Total Mileage: {user.total.mileage} KM
                  </ListItem>
                </Grid>
                <Grid item>
                  <ListItem>
                    Total Trips: {user.total.trip} Trips
                  </ListItem>
                </Grid>
                <Grid item>
                  <ListItem>
                    Total Carbon Emissions: {user.total.emission} Tonnes of CO2 emissions
                  </ListItem>
                </Grid>
              </>
            }
          </Grid>
        </Grid>
      </div>

    );
}

export default ProfilePage;