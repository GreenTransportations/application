import React, { useState } from 'react';


// Material UI Core Components
import { makeStyles } from '@material-ui/core/styles';
import { API_CONFIG } from '../../configs/api.config';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {InputAdornment, IconButton } from "@material-ui/core";



// Material UI Icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import CheckIcon from '@material-ui/icons/Check';

// Other Components
import { ReactComponent as GTLogo } from "../../assets/logo.svg";
import { Link } from '@material-ui/core';
import { FETCH } from '../../utils/fetch.util';


// Style
const useStyles = makeStyles((theme) => ({
    loginRow: {
        margin: "20px 0px"
    },
    loginRowIcon: {
        fontSize: "large",
        width: "2em",
        height: "2em",
        margin: "0px"
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

    //Defines the password toggle handler
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const loginHandle = async (e) => {
        e.preventDefault();

        const userInfo = {
            username: username,
            password: password
        }

        FETCH.POST("auth", "login", "", userInfo)
            .then(async (response) => {
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
                        InputProps={{endAdornment:(
                            <InputAdornment position="end">
                                <IconButton>
                                    <CheckIcon />
                                </IconButton>
                            </InputAdornment>
)
                        
                        }}
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
                        type= {showPassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        /*=================================================
                        This section Adds an extra
                        ===================================================*/
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  //onMouseDown={handleMouseDownPassword}
                                >
                                  {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
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