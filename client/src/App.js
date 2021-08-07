import React, { useState, useEffect, useContext } from 'react'
import { Socket } from 'socket.io';
import './App.css'
import Chat from './chat'
import { SocketContext } from './socketcontext'
import Login from './login'
import { AuthProvider, FirebaseContext } from './providers/auth'
import { BrowserRouter, Link, Route } from 'react-router-dom'


function App() {
  const [response, setResponse] = useState('');
  const { user, isloggedin } = useContext(FirebaseContext) || '';
  const { id } = useContext(SocketContext);

  console.log(user)
  return (
    <BrowserRouter>
        {isloggedin
          ? <Chat/>
          : <Login />
        }
    </BrowserRouter>

  );
}

export default App;
