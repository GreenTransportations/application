import React from 'react';
import { Redirect } from 'react-router';

// Other Components
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import SignupPage from './signup.page';
import LoginPage from './login.page';



const AuthPage = ({ onAuth }) => {
    return (
        <Router>
            <Switch>
                <Route path="/signup">
                    <SignupPage onSignUp={onAuth} />         
                </Route>
                <Route path="/login">
                    <LoginPage onLogin={onAuth}/>         
                </Route>
                <Route path="/">
                    <Redirect to="/login" />                
                </Route>
            </Switch>
        </Router>
    )
}

export default AuthPage;