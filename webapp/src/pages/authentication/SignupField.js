import React, { useState } from 'react';

// Material UI Core Components
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

// Material UI Icons
import AccountBox from '@material-ui/icons/AccountBox';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import Today from '@material-ui/icons/Today';
import Email from '@material-ui/icons/Email';
import ContactPhone from '@material-ui/icons/ContactPhone';


// Style
const useStyles = makeStyles((theme) => ({
    signupRow: {
        margin: "20px 10px"
    },
    signupRowIcon: {
        fontSize: "large",
        width: "2em",
        height: "2em",
        margin: "5px"
    },
}));

const SignupField = (props) => {
    // Generic value to set.
    const [val, setVal] = useState("");
    const classes = useStyles();

    return (
        <Grid
        className={classes.signupRow}
        container
        direction="row"
        justify="center"
        alignItems="center"
    >
        <props.icon className={classes.signupRowIcon} />
        <TextField
            label={props.nameval}
            variant="filled"
            value={val}
            onChange={(e) => setVal(e.target.value)}
        />
    </Grid>
    );
};

export default SignupField;