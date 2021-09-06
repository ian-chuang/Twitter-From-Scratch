import React, {useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

export default function PrivateRoute({component: Component, ...rest}) {  
    
    const {firebaseUser} = useSelector(state=> state.user);

    console.log(firebaseUser);

    return (
        <Route
            {...rest}
            render={props => {
                return firebaseUser ? <Component {...props} /> : <Redirect to="/login"/>;
            }}
        />
    )
}
