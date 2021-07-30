import React, { useState } from 'react';
// import SignupField from './SignupField';


// Material UI Core Components
import { makeStyles } from '@material-ui/core/styles';
import { API_CONFIG } from '../../configs/api.config';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


// Material UI Icons
import AccountBox from '@material-ui/icons/AccountBox';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import Today from '@material-ui/icons/Today';
import Email from '@material-ui/icons/Email';
import ContactPhone from '@material-ui/icons/ContactPhone';


// Other Components
import { ReactComponent as GTLogo } from "../../asset/logo.svg";
import AccountCircle from '@material-ui/icons/AccountCircle';


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
    squareButton: {
        color: "white",
        borderRadius: 0
    }
}));


const SignupPage = ({ onLogin }) => {
    // const vals = [
    //     {attri: "firstname", icon: AccountBox},
    //     {attri: "lastname", icon: AccountBox},
    //     {attri: "dob", icon: Today},
    //     {attri: "email", icon: Email},
    //     {attri: "mobile", icon: ContactPhone},
    //     {attri: "username", icon: AccountCircleIcon},
    //     {attri: "password", icon: LockIcon}
    // ]
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [dob, setDob] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const classes = useStyles();

    const signupHandle = async (e) => {
        e.preventDefault();

        const userInfo = {
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname,
            dob: dob,
            email: email,
            mobile: mobile
        }
        fetch(`${API_CONFIG.URL}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo)
        }).then(async (response) => {
            if (response.ok) {
                console.log("Server success on signup");
                const res = await response.json();
                console.log(res);
                onLogin(res.accessCode);
            } else {
                console.log("Error on Signup");
            }
        })
    };

    // TODO: Set these Grid elements using a list function.
    return (
        <div>
            <Grid
                justify="center"
                alignItems="center"
            >
                <Grid>
                    <GTLogo />
                </Grid>
                {/* <>
                {vals.map(v => (
                    <SignupField
                    val={v.attri}
                    icon={v.icon}/>
                ))}
                </> */}
                <Grid
                    className={classes.signupRow}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <AccountBox className={classes.signupRowIcon} />
                    <TextField
                        label="First Name"
                        variant="filled"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                </Grid>
                <Grid
                    className={classes.signupRow}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <AccountBox className={classes.signupRowIcon} />
                    <TextField
                        label="Last Name"
                        variant="filled"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                </Grid>
                <Grid
                    className={classes.signupRow}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Today className={classes.signupRowIcon} />
                    <TextField
                        label="Date of Birth"
                        variant="filled"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                    />
                </Grid>
                <Grid
                    className={classes.signupRow}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Email className={classes.signupRowIcon} />
                    <TextField
                        label="Email"
                        variant="filled"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Grid>
                <Grid
                    className={classes.signupRow}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <ContactPhone className={classes.signupRowIcon} />
                    <TextField
                        label="Mobile"
                        variant="filled"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                </Grid>
                <Grid
                    className={classes.signupRow}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <AccountCircleIcon className={classes.signupRowIcon} />
                    <TextField
                        label="Username"
                        variant="filled"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Grid>
                <Grid
                    className={classes.signupRow}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <LockIcon className={classes.signupRowIcon} />
                    <TextField
                        label="Password"
                        variant="filled"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid>
                <Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.squareButton}
                        onClick={signupHandle}
                    >
                        Continue
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default SignupPage;