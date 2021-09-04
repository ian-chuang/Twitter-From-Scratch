import React, {useState} from 'react';
import {Route, Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoute({component: Component, ...rest}) {  
    
    const {user, loading} = useSelector(state => state.user);

    return (
        <>
            { !loading &&
                <Route
                    {...rest}
                    render={props => {
                        return user ? <Component {...props} /> : <Redirect to="/login"/>
                    }}
                />
            }
            
        </>
    )
}
