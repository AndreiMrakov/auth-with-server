import React from 'react';
import {Router, Route, NavLink, Redirect} from "react-router-dom";
import {Switch} from "react-router";
import Login from "./Login";
import Registration from "./Registration";
import Profile from "./Profile";
import History from '../History';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: '',
                pass: '',
            },
            isLogged: false,
        };
        this.logInUser = this.logInUser.bind(this);
        this.logOutUser = this.logOutUser.bind(this);
    }

    logInUser(user) {
        this.setState({user: {email: user.email, pass: user.pass}, isLogged: true});
    }

    logOutUser() {
        this.setState({user: {email: '', pass: ''}, isLogged: false});
    }

    render() {
        return (
            <Router history={History}>
                <div>
                    <div className="nav-panel">
                        {!this.state.isLogged && <NavLink to='/login'>Login</NavLink>}
                        {this.state.isLogged && <NavLink to='/profile'>Profile</NavLink>}
                        {!this.state.isLogged && <NavLink to='/reg'>Registration</NavLink>}
                    </div>
                    <Switch>
                        {!this.state.isLogged && <Route exact path='/login'
                                                        render={() => <Login history={History}
                                                                             load={this.logInUser}/>}/>}
                        {this.state.isLogged && <Route exact path='/profile'
                                                       render={() => <Profile history={History}
                                                                              user={this.state.user}
                                                                              logOut={this.logOutUser}/>}/>}
                        {!this.state.isLogged && <Route exact path='/reg' component={Registration}/>}
                        {!this.state.isLogged && <Redirect from='' to='/login'/>}
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;