import React from 'react';
import { useHistory, useLocation} from 'react-router';
import { Link } from 'react-router-dom';


// Material UI Core Components
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Other Components
import { ReactComponent as GTLogoInvert } from "../../assets/logo_invert.svg";


// Material UI Icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { USER_TYPE } from '../../enums/user.enum';
import { Icon } from '@material-ui/core';


// Style
const DRAWER_WIDTH = 240;
const HIGHLIGHT_WIDTH = DRAWER_WIDTH / 1.15;
// literal string concat: "${HIGHLIGHT_WIDTH}px"
const useStyles = makeStyles((theme) => ({
    drawer: {
        width: DRAWER_WIDTH,
        flexShrink: 0,
        alignItems: 'center',
        backgroundColor: "#000000",
        borderRadius: "0px"
        
    },
    drawerPaper: {
        width: DRAWER_WIDTH,
        alignItems: 'center',
        backgroundColor: "rgba(7, 143, 97, 1)",
        border: "0px",
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


const APP_PAGES= { };

APP_PAGES[USER_TYPE.DRIVER] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: 'dashboard',
    },
    {
        title: 'Navigate',
        url: "/map",
        icon: "directions"
    },
    {
        title: 'Trips',
        url: '/trips',
        icon: 'location_on'
    },
   
    {
        title: 'Vehicle List',
        url: '/vehicle',
        icon: 'local_shipping'
    },
    {
        title: 'Profile',
        url: '/profile',
        icon: 'person'
    },
];

APP_PAGES[USER_TYPE.MANAGER] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: 'dashboard',
    },
    
    {
        title: 'Driver List',
        url: '/driver/list',
        icon: 'group'
    },
    {
        title: 'Live Trips',
        url: '/trips/live',
        icon: 'live_tv_icon'
    },
    {
        title: 'Reports',
        url: '/report',
        icon: 'assessment'
    },
    {
        title: 'Vehicle List',
        url: '/vehicle',
        icon: 'local_shipping'
    },
    {
        title: 'Profile',
        url: '/profile',
        icon: 'person'
    },
    
];



const Sidebar = ({ open, user, logout }) => {
    const history = useHistory();
    const location =  useLocation();
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
                <Link to={{
                pathname: "/dashboard"}}>
                    <GTLogoInvert justify="center" alignItems="center" width = "240px" height = "240px" />
                </Link>
            </div>

            <List>
                {APP_PAGES[user.type].map((page, index) => (
                    <ListItem 
                        style={{backgroundColor: location.pathname === page.url ? "white": "", width : HIGHLIGHT_WIDTH , borderRadius: "180px", marginTop: "10px"  }}
                        key={index} 
                        button
                        onClick={() => {
                            history.push(page.url);
                        }}
                    >
                        <ListItemIcon>
                            <Icon style={{color: location.pathname === page.url ? "var(--gt-primary-color)": "white"}}>
                                {page.icon}
                            </Icon>
                        </ListItemIcon>
                        
                        <ListItemText 
                            style={{color: location.pathname === page.url ? "var(--gt-primary-color)": "white" }}
                            primary={page.title}
                        />
                    </ListItem>
                ))}
            </List>

            <List style = {{position: "absolute", bottom: "0", width : HIGHLIGHT_WIDTH}}>
                <ListItem button
                style = {{borderRadius: "180px"}} >
                    <ListItemIcon>
                        <ExitToAppIcon style={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText style={{ color: 'white'}} 
                        primary="Log Out" 
                        onClick={()=> {
                            history.push("/login");
                            logout();
                        }}
                    />
                </ListItem>
            </List>
        </Drawer>
    );
}


export default Sidebar;