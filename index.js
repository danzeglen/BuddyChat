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

const pushUser = (user) => {
    let obj = userlist.find(x => x.username === user.username)
    console.log(obj)
    console.log('^^^^^')
    if(typeof obj === 'undefined'){
        userlist.push(user)
    } else {
        let index = userlist.indexOf(obj);
        userlist[index] = obj
    }
}

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


    socket.on('join_room', ({username,room}, callback) => {
        let id = socket.id
        const user = {username, room, id}
        pushUser(user)
        console.log('joining room')
        socket.join(room)
        io.in(room).emit('new_room', `Thank you for joining ${room}`)
        console.log(userlist)
        socket.emit('all_users', (userlist))
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

    socket.on('disconnect', () => {
        console.log('DISCONNECTED USER')
        let dis_user = userlist.find(x => x.id === socket.id)
        let index = userlist.indexOf(dis_user)
        console.log(index)
        userlist.splice(index,1);
        console.log(userlist)
        console.log(dis_user)
    });

})


server.listen(port, () => console.log('I AM ALIVE'));

