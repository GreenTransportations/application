import React, { useState } from 'react';


// Material UI Core Components
import { makeStyles } from '@material-ui/core/styles';


// Material UI Icons


// Other Components
import Sidebar from '../sidebar/sidebar.component';


// Style
const DRAWER_WIDTH = 240;
const useStyles = makeStyles((theme) => ({
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: "var(--gt-primary-color)",
        color: "#ffffff",
        zIndex: 2000,
        boxShadow: "none"
    },
    appBarShift: {
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: DRAWER_WIDTH,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    }
}));


const Header = ({ logout, user }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(true);

    return (
        <>
            <Sidebar 
                user={user}
                open={open}
                logout={logout}
            />
        </>
    );
}
export default Header;