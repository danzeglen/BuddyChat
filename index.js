const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const {addUser, getUser, deleteUser, getUsers} = require('./user')
const port = process.env.PORT || 4000;

const app = express();
app.use(cors())
const server = http.createServer(app)

let userlist = [];

const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ["GET","POST"]
    }
});


app.get("/",(req,res) => {
    res.send('hello')
})

io.on("connection", socket => {

    socket.on('login',({name, room}, callback) => {
        const { user, error } = addUser(socket.id, name, room)
        if(error) return callback(error)

        socket.join(user.room)
        socket.in(room).emit('notification', { title: 'Someone\'s here', description: `${user.name} just entered the room` })
        io.in(room).emit('users', getUsers(room))
        callback()

    })

    socket.on('join_room', ({username,room}, callback) => {
        let id = socket.id
        const user = {username, room, id}
        userlist.push(user)
        console.log('joining room')
        socket.join(room)
        io.in(room).emit('new_room', `Thank you for joining ${room}`)
    })


    socket.on('message',(data) => {
        console.log(data)
    });

    socket.emit('me', socket.id);

    socket.on('sentmessage', ({message,room,username}) => {
        console.log(message);

        socket.broadcast.emit('sentmessage', {message,room,username})

        socket.emit('selfmessage', {message,room,username})
    
    })

})


server.listen(port, () => console.log('I AM ALIVE'));

