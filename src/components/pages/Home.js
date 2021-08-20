import React from 'react'
import {Button} from '@material-ui/core';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router';

export default function Home() {

    const { logout } = useAuth();
    const history = useHistory();

    const handleLogout = () => {
        logout()
        .then(() => history.push('/login'))
        .catch((err) => console.log(err))
    }

    return (
        <div>
            Home

            <Button variant="contained" onClick={handleLogout}>Log out</Button>

        </div>
    )
}
