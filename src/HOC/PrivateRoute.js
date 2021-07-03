import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const user = useSelector(state => state.account)

    return <Route {...rest} component={(props) => {
        const token = window.localStorage.getItem('token')
        if (token && user.authenticate === true) {
            return <Component {...props} />
        } else {
            return <Redirect to={`/signin`} />
        }
    }} />
}

export default ProtectedRoute;