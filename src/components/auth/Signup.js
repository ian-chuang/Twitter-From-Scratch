import React, { useState } from 'react'
import {Button, TextField} from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';
import { firestore, auth } from '../../firebase/config';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setError('');
        setLoading(true);

        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password)
            firestore.collection('users')
            .doc(user.uid)
            .set({
                username: username,
                email: email,
            });
            history.push('/home')
        }
        catch {
            setError('Failed to sign up')
        }
        finally {
            setPassword('');
            setLoading(false)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextField type="text" label="Username" onChange={(e)=>setUsername(e.target.value)} required/>
                <br/>
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
