import React, {useState, useEffect, useContext } from 'react'
import { auth } from '../../firebase/config';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect (() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [])

    return (
        <AuthContext.Provider value={{currentUser}}>
            {!loading && children }
        </AuthContext.Provider>
    )
}
