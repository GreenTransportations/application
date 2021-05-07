import React, { useState } from 'react';


// Material UI Core Components
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


// Material UI Icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';


// Other Components
import { ReactComponent as GTLogo } from "../asset/logo.svg";


// Style
const useStyles = makeStyles((theme) => ({
    loginRow: {
        margin: "20px 10px"
    },
    loginRowIcon: {
        fontSize: "large",
        width: "2em",
        height: "2em",
        margin: "5px"
    },
    squareGreenButton: {
        backgroundColor: "var(--gt-primary-color)",
        color: "#fff5f5",
        borderRadius: 0
    }
}));

const PLACEHOLDER_USERNAME = "admin";
const PLACEHOLDER_PASSWORD = "admin";


const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const classes = useStyles();

    const login = () => {
        console.log(username, password)
        if (username === PLACEHOLDER_USERNAME && password === PLACEHOLDER_PASSWORD){
            onLogin(username);
        }
    }
    return (
        <div>
            <Grid
                justify="center"
                alignItems="center"
            >
                <Grid>
                    <GTLogo />
                </Grid>
                <Grid                    
                    className={classes.loginRow}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <AccountCircleIcon className={classes.loginRowIcon}/>
                    <TextField 
                        label="Username" 
                        variant="filled"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Grid>
                <Grid
                    className={classes.loginRow}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <LockIcon className={classes.loginRowIcon}/>
                    <TextField 
                        label="Password" 
                        variant="filled" 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid>
                <Grid>
                    <Button variant="contained" color="primary"
                        onClick={login}
                    >
                        Continue
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default LoginPage;