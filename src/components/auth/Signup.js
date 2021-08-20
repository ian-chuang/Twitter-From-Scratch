import React, { useState } from 'react'
import {Button, TextField} from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { signup } = useAuth();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setError('');
        setLoading(true);

        signup(email, password)
        .then(() => history.push('/home'))
        .catch((err) => setError('Failed to log in'))
        .finally(() => setLoading(false))
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextField type="email" label="Email" onChange={(e)=>setEmail(e.target.value)} required/>
                <br/>
                <TextField type="password" label="Password" onChange={(e)=>setPassword(e.target.value)} required/>
                <br/>
                <Button type="submit" disabled={loading} variant="contained">Sign up</Button>
            </form>  
            <div>
                Already have an account?
                <Link to='/login'>Log in</Link>
            </div>
        </>
    )
}
