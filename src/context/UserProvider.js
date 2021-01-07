import React, { useEffect, useState, createContext, useContext } from "react";
import { useHistory } from "react-router-dom";
import { auth, googleProvider } from '../utils/firebase.config';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [curUser, setCurUser] = useState(null);
    const [pending, setPending] = useState(true);
    const history = useHistory();

    async function handleLogin() {
        try {
            const credential = await auth.signInWithPopup(googleProvider);
            history.push('/');
        } catch (err) {
            console.error(err);
        }
    }

    async function handleLogout() {
        auth.signOut().then(() => {
            console.log(`Logged out!`);
        }).catch(err => {
            console.error(err.message);
        });
    }


    useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {
            console.log("Change");
            setCurUser(user);
            setPending(false);
        });
        return unsub;
    }, [])

    if (pending) {
        return <>Loading...</>;
    }
    const value = {
        curUser,
        handleLogin,
        handleLogout,
    }
    return (
        <UserContext.Provider
            value={value}
        >
            {!pending && children}
        </UserContext.Provider>
    );
};