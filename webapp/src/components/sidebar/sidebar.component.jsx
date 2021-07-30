import React from 'react';
import { useHistory } from 'react-router';


// Material UI Core Components
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


// Material UI Icons


// Other Components


// Material UI Icons
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LocationOnIcon from '@material-ui/icons/LocationOn';


// Style
const DRAWER_WIDTH = 240;
const useStyles = makeStyles((theme) => ({
    drawer: {
        width: DRAWER_WIDTH,
        flexShrink: 0,
        backgroundColor: "#fff5f5"
    },
    drawerPaper: {
        width: DRAWER_WIDTH,
        backgroundColor: "rgba(146, 208, 80, 0.4)"
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
        backgroundColor: "var(--gt-primary-color)",
    }
}));


const Sidebar = ({open}) => {
    const history = useHistory();
    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
            </div>
            <Divider />
            <List>

                
                <ListItem button>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText 
                        primary="Dashboard" 
                        onClick={()=>{
                            history.push("/dashboard")
                        }}
                    />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <LocationOnIcon />
                    </ListItemIcon>
                    <ListItemText 
                        primary="Trips" 
                        onClick={()=>{
                            history.push("/trips")
                        }}
                    />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <LocationOnIcon />
                    </ListItemIcon>
                    <ListItemText 
                        primary="Tests" 
                        onClick={()=>{
                            history.push("/tests")
                        }}
                    />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText 
                        primary="Profile" 
                        onClick={()=>{
                            history.push("/profile")
                        }}
                    />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Log In" 
                        onClick={()=>{
                            history.push("/login")
                        }}
                    />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Sign Up" 
                        onClick={()=>{
                            history.push("/signup")
                        }}
                    />
                </ListItem>
            </List>
        </Drawer>
    );
}


export default Sidebar;