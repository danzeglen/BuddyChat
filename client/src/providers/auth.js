import { fire, db } from '../firebase'
import React, { createContext, useState, useRef, useEffect } from 'react';

const FirebaseContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, SetUser] = useState();
    const [isloggedin, setIsloggedin] = useState(false);
    const [guestname, setGuestName] = useState('');

    function login(email, password,e) {
        e.preventDefault()
        console.log('loggin in')
        fire.auth().signInWithEmailAndPassword(email, password).then((usercred) => {
            SetUser(usercred);
        }).catch((err) => {
            console.log(err)
        })
    }

    function createAccount(email, password) {
        fire.auth().createUserWithEmailAndPassword(email, password).then((usercred) => {
            SetUser(usercred.user)
        }).catch((err) => {
            console.log(err)
        })
    }

    function logout() {
        console.log('logging out')
        fire.auth().signOut().then(() => {
            SetUser(null);
            setIsloggedin(false);
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        fire.auth().onAuthStateChanged((usercred) => {
            console.log('we in here')
            if (usercred) {
                console.log('we in')
                SetUser(usercred)
                setIsloggedin(true);
            } else {

            }
        })
    }, [user])

    return (
        <FirebaseContext.Provider value={{ createAccount, user, login, logout, isloggedin, setIsloggedin, guestname, setGuestName }}>
            {children}
        </FirebaseContext.Provider>
    );
};

export { AuthProvider, FirebaseContext }
