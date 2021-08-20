import React, {useState, useEffect, useContext} from 'react';
import { auth } from '../firebase/config';

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const signup = (email, password) => auth.createUserWithEmailAndPassword(email, password);
    const login = (email, password) => auth.signInWithEmailAndPassword(email, password);
    const logout = () => auth.signOut();

    useEffect (() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setLoading(false);
            setCurrentUser(user);
        })

        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}