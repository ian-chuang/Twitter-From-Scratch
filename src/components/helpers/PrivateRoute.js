import React, {useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

export default function PrivateRoute({component: Component, ...rest}) {  
    
    const {firebaseUser, user} = useSelector(state=> state.user);

    return (
        <Route
            {...rest}
            render={props => {
                return (firebaseUser || user === undefined) ? (user && <Component {...props} />) : <Redirect to="/login"/>;
            }}
        />
    )
}
