import React, { useState } from 'react';


// Material UI Core Components
import { makeStyles } from '@material-ui/core/styles';
import { API_CONFIG } from '../../configs/api.config';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


// Material UI Icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';


// Other Components
import { ReactComponent as GTLogo } from "../../assets/logo.svg";
import { Link } from '@material-ui/core';


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
    squareButton: {
        color: "white",
        borderRadius: 4,
        fontWeight: 'light'
    }
}));


const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const classes = useStyles();

    // const login = () => {
    //     console.log(username, password)
    //     if (username === PLACEHOLDER_USERNAME && password === PLACEHOLDER_PASSWORD){
    //         onLogin(username);
    //     }
    // }
    const loginHandle = async (e) => {
        e.preventDefault();

        const userInfo = {
            username: username,
            password: password
        }
        fetch(`${API_CONFIG.URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo)
        }).then(async (response) => {
            if (response.ok) {
                console.log("Server success on login");
                const res = await response.json();
                console.log(res);
                onLogin(res.accessCode);
            } else {
                console.log("Error on Login");
            }
        })
    };

    return (
        <div>
            <Grid
                justify="center"
                alignItems="center"
            >
                <Grid
                justify="center"
                alignItems="center">
                    <GTLogo />
                </Grid>


                <Grid
                    className={classes.loginRow}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <AccountCircleIcon className={classes.loginRowIcon} />
                    <TextField
                        label="Username"
                        variant="outlined"
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
                    <LockIcon className={classes.loginRowIcon} />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid>
            
                <Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.squareButton}
                        onClick={loginHandle}
                    >
                        Login
                    </Button>
                </Grid>

                <div style = {{paddingTop: "20px"}}>
                    <a>Not yet registered?</a>
                </div>
                <div style = {{paddingBottom: "20px"}}>
                    <Link href="signup">
                        Click to Sign Up!
                    </Link>
                </div>
                
            </Grid>
        </div>
    )
}

export default LoginPage;