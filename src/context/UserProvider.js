import React, { useEffect, useState, createContext, useContext } from "react";
import { auth, googleProvider } from '../utils/firebase.config';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [curUser, setCurUser] = useState(null);
    const [pending, setPending] = useState(true);

    async function handleLogin() {
        try {
            const credential = await auth.signInWithPopup(googleProvider);
            console.log(credential);
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
            console.log(user);
            setCurUser(user);
            setPending(false);
        });
        return unsub;
    }, [])

    if (pending) {
        return <>Loading...</>;
    }
    console.log(curUser);
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