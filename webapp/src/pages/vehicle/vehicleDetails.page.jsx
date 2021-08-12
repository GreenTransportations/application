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
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import EmailIcon from '@material-ui/icons/Email';
import BusinessIcon from '@material-ui/icons/Business';
import PhoneIcon from '@material-ui/icons/Phone';
import EditIcon from '@material-ui/icons/Edit';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

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


export default function ProfilePage() {
  const classes = useStyles();
  const user = {
    id: 1,
    userName: 'Loc Lien',
    age: 20,
    company: 'Green Transport',
    email: 'xxxx.gmail.com',
    phoneNumber: 1234567,
    vehicle: '[Car Brand] [Car Model]'

  }

    return (
      <>
        <Grid
          container
          direction="column"
          justify="space-around"
          alignItems="center"
          spacing={1}
        >

          {/* <Grid
            item
          >
            <List>
              {Sidebar}
            </List>
          </Grid> */}


          <Grid
            item
            justify="center"
            alignItems="center"
          >
            {/*user name*/}
            {user.userName}
            <EditIcon />
          </Grid>

          <Grid item>
            <ListItem>
              <ListItemIcon>
                <CalendarTodayIcon />
              </ListItemIcon>
              <ListItemText primary="Date Of Birth: DD/MM/YYYY" />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <LocalShippingIcon />
              </ListItemIcon>
              <ListItemText primary="Current Registered Vehicle: [Car Brand] [Car Model] " />
            </ListItem>

            <ListItem alignItems= 'flex-start'>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary= "Email: " />
              <ListItemText primary= {user.email} />
            </ListItem>

            <ListItem alignItems= 'flex-start'>
              <ListItemIcon>
                <PhoneIcon />
              </ListItemIcon>
              <ListItemText primary= "Phone: " />
              <ListItemText primary= {user.phoneNumber} />
            </ListItem>

            <ListItem alignItems= 'flex-start'>
              <ListItemIcon>
                <BusinessIcon />
              </ListItemIcon>
              <ListItemText primary= "Company: " />
              <ListItemText primary= {user.company} />
            </ListItem>

          </Grid>

        </Grid>
      </>

    );
}
