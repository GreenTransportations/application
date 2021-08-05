import React from 'react';
import { useHistory } from 'react-router';


// Material UI Core Components
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


// Other Components
import { ReactComponent as GTLogo } from "../../assets/logo.svg";
import { ReactComponent as GTLogoInvert } from "../../assets/logo_invert.svg";


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
        backgroundColor: "#000000",
        borderRadius: "8px"
    },
    drawerPaper: {
        width: DRAWER_WIDTH,
        backgroundColor: "rgba(7, 143, 97, 1)",
        borderTopRightRadius: "25px",
        borderBottomRightRadius: "25px"
        

    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 0),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
        backgroundColor: "var(--gt-primary-color)",
    }
}));


const Sidebar = ({ open, logout }) => {
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
            <GTLogoInvert justify="center" alignItems="center" width = "250px" height = "250px" />

            </div>

        
                        

            <List>

                
                <ListItem button>
                    <ListItemIcon>
                        <DashboardIcon style={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText style={{ color: 'white' }}
                        primary="Dashboard" 
                        onClick={()=>{
                            history.push("/dashboard")
                        }}
                    />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <LocationOnIcon style={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText style={{ color: 'white' }} 
                        primary="Trips" 
                        onClick={()=>{
                            history.push("/trips")
                        }}
                    />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <LocationOnIcon style={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText style={{ color: 'white' }} 
                        primary="Tests" 
                        onClick={()=>{
                            history.push("/tests")
                        }}
                    />
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <PersonIcon style={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText style={{ color: 'white' }} 
                        primary="Profile" 
                        onClick={()=>{
                            history.push("/profile")
                        }}
                    />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <PersonIcon style={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText style={{ color: 'white' }} 
                        primary="Driver List" 
                        onClick={()=>{
                            history.push("/driverlist")
                        }}
                    />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <ExitToAppIcon style={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText style={{ color: 'white' }} 
                        primary="Log Out" 
                        onClick={()=> {
                            logout();
                            history.push("/login");
                        }}
                    />
                </ListItem>
            </List>
        </Drawer>
    );
}


export default Sidebar;