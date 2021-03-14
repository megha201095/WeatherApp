import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from '../pages/Login';
import SearchPlanet from '../pages/SearchPlanet';

import configureStore from '../store';

const store = configureStore();

const PrivateRoute = (props) => {
    if (sessionStorage.getItem('user')) {
        return (
            <React.Fragment>
                <Route {...props} />
            </React.Fragment>)
    } else
        return (
            <Redirect to="/login" />
        )
}

const PublicRoute = (props) => {
    if (!sessionStorage.getItem('user')) {
        return <Route {...props} />
    } else
        return (
            <Redirect to="/weather" />
        )
}

const Routes = () => {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <PrivateRoute exact path="/weather" component={SearchPlanet} />
                    <PublicRoute exact path="/login" component={Login} />
                    <PublicRoute path="*" component={() => (<Redirect to="/login" />)} />
                </Switch>
            </Router>
        </Provider>
    )
}

export default Routes;