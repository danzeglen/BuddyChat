import React, { useEffect, useState, createContext, useRef } from 'react'
import { io } from 'socket.io-client'

const SocketContext = createContext();

const socket = io('https://daniel-chat1999.herokuapp.com')
//const socket = io('http://localhost:4000/');



const ContextProvider = ({ children }) => {
    const [id, setID] = useState('')
    const [usermessage, setMessage] = useState([]);
    const [room, setRoom] = useState();
    const ref = useRef(usermessage);
    const [userlist, setUserList] = useState()

    useEffect(() => {
        socket.on('me', (id) => setID(id))
        console.log(id);


        socket.on('sentmessage', ({ message, room, username }) => {
            console.log('we got the message')
            handleNewMessage(message, room, username);
        });

        socket.on('selfmessage', ({ message, room, username }) => {
            console.log('we got the message')
            handleNewMessage(message, room, username);
        });

        socket.on('new_room', (data, room) => {
            handleNewMessage(data, room)
        })

        socket.on('users', (users) => {
            console.log(users);
        })

        socket.on('all_users', (userlists) => {
            console.log('it hit all users')
            setUserList(userlists)
            console.log(userlists)
        })

    }, [])

    const joinRoom = (username, room) => {
        socket.emit('join_room', { username, room })
    }




    const sendMessage = (message, room, username) => {
        console.log('sent message')
        socket.emit('sentmessage', { message, room, username })
    }

    function handleNewMessage(data, room, username) {

        const addMessage = {
            data, name: username, room: room
        }
        setMessage((usermessage) => [...usermessage, addMessage])
    }
    console.log(usermessage)

    return (
        <SocketContext.Provider value={{
            id,
            sendMessage,
            usermessage,
            setMessage,
            joinRoom,
            userlist,
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export { ContextProvider, SocketContext }