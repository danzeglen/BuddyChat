import React, { useState, useContext, useEffect, useRef } from 'react'
import { TextField, Grid, Button, IconButton, Typography,Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { SocketContext } from './socketcontext'
import SendIcon from '@material-ui/icons/Send';
import audio from './tweet-416.mp3'
import { FirebaseContext } from './providers/auth'
import Nav from './nav'
import unnamed from './unnamed.png'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '1000px',
        height: '600px',
        backgroundColor: 'rgb(179, 225, 255,0.8)',
        borderRadius: '20px',
        marginTop: '10px'

    },
    chatbox: {
        height: '20%',
    },
    chat: {
        height: '90%',
        overflowWrap: 'break-word',
        overflowY: 'scroll',
    },
    pannelone: {
        backgroundColor: 'white',
        height: '90%',
        margin: '5px',
        borderRadius: '20px',
        boxShadow: '3px 5px 3px #636363',
        [theme.breakpoints.down('xs')]: {
            height: '10%'
        },

    },
    panneltwo: {
        backgroundColor: 'white',
        height: '90%',
        margin: '5px',
        borderRadius: '20px',
        boxShadow: '3px 5px 3px #636363',
        [theme.breakpoints.down('xs')]: {
            height: '30%'
        },


    },
    pannelthree: {
        margin: '5px',
        height: '90%',
        backgroundColor: 'rgb(255,255,255)',
        borderRadius: '20px',
        boxShadow: '3px 5px 3px #636363',

    },
    sentmessage: {
        color: 'white',
        backgroundColor: '#1982FC',
        borderRadius: '10px',
        paddingLeft: '7px',
        paddingRight: '7px',




    },
    sentspan: {
        backgroundColor: '#1982FC',
        borderRadius: '10px',
        color: 'white',
        paddingLeft: '7px',
        paddingRight: '7px',
        paddingBottom: '3px',
        paddingTop: '3px'

    },
    recivedmessaged: {
        textAlign: 'left',
        marginLeft: ' 5px',
        paddingTop: '3px',
        paddingBottom: '3px',
        paddingLeft: '7px',
        paddingRight: '7px',
        backgroundColor: '#ededed',
        borderRadius: '10px'


    },
    recivedspan: {
        paddingLeft: '7px',
        paddingRight: '7px',
        backgroundColor: '#ededed',
        borderRadius: '10px',
        paddingBottom: '3px',
        paddingTop: '3px',


    },

    btn: {
        textTransform: 'none',
        color: '#0069ad',
    },

    font: {
        fontFamily: 'Francois One',
        fontSize: '45px',
        margin: '0px'
    }

}))


const Chat = () => {
    const classes = useStyles()
    const [input, setInput] = useState('');
    const [username, setUsername] = useState('');
    const [currentRoom, setCurrentRoom] = useState('jokes')
    const { sendMessage, usermessage, joinRoom, userlist } = useContext(SocketContext);
    const { logout, guestname } = useContext(FirebaseContext);
    const divRef = useRef(null);

    console.log(username)
    console.log(guestname)
    const messageBox = () => {
        new Audio(audio).play();
        sendMessage(input, currentRoom, guestname)
        setInput('');

    }

    const setRoom = (room) => {
        joinRoom(guestname, room)
        setCurrentRoom(room)
    }

    const handleEnter = (event) => {

        console.log(event.code)
        if (event.code === 'Enter') {
            console.log('in here')
            messageBox()
        }
    }

    const DisplayParticipants = () => {
        console.log(userlist)
        let participants = ''
        if (typeof userlist !== 'undefined') {
            participants = userlist.map((element) => {
                return (
                    <p>{element.username}</p>
                )
            })
        }
        return (
            <div>{participants}</div>
        )

    }

    useEffect(() => {
        console.log('running')
        divRef.current.scrollIntoView(false);
    }, [usermessage])

    console.log(userlist)
    console.log('^^^^^^^^^')


    const DisplayMessage = () => {
        const messages = usermessage.filter(user => user.room === currentRoom)
        console.log(messages)
        const map = messages.map((element) => {
            if (element.name === guestname) {
                if (element.data.length * 6.5 > document.getElementById('chatbox').getBoundingClientRect().width) {
                    return (
                        <div style={{ width: '100%' }}>
                            <p style={{ display: 'flex', justifyContent: 'flex-end', margin: '0px', marginTop: '10px', opacity: '0.6', fontSize: '13px' }}>{element.name}</p>
                            <p className={classes.sentmessage} style={{ margin: '0px' }}>
                                <span>
                                    {element.data}
                                </span>
                            </p>
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <p style={{ display: 'flex', justifyContent: 'flex-end', margin: '0px', marginTop: '10px', opacity: '0.6', fontSize: '13px' }}>{element.name}</p>
                            <p style={{ display: 'flex', justifyContent: 'flex-end', margin: '0px' }}>
                                <span className={classes.sentspan}>
                                    {element.data}
                                </span>
                            </p>
                        </div>
                    )
                }
            } else {
                console.log('did he make it')

                if (element.data.length * 6.5 > document.getElementById('chatbox').getBoundingClientRect().width * 0.75) {
                    console.log('did he make it 2')
                    return (


                        <div style={{ width: '100%' }}>
                            <p style={{ display: 'flex', justifyContent: 'flex-start', margin: '0px', marginTop: '10px', opacity: '0.6', fontSize: '13px' }}>{element.name}</p>
                            <p className={classes.recivedmessaged} style={{ margin: '0px' }}>
                                <span>
                                    {element.data}
                                </span>
                            </p>
                        </div>

                    )
                } else {
                    return (

                        <div>
                            <p style={{ display: 'flex', justifyContent: 'flex-start', margin: '0px', marginTop: '10px', opacity: '0.6', fontSize: '13px' }}>{element.name}</p>
                            <p style={{ display: 'flex', justifyContent: 'flex-start', margin: '0px' }}>
                                <span className={classes.recivedspan}>
                                    {element.data}
                                </span>
                            </p>
                        </div>
                    )
                }
            }
        });
        return (
            <div ref={divRef} style={{ overflowX: 'auto', width: '100%' }}>{map}</div>
        )
    }

    return (
        <>
            <p className={classes.font} style={{ textAlign: 'center' }}>BuddyChat   <img style={{ width: '3%' }} src={unnamed}></img></p>
            <div className={classes.background} style={{ justifyContent: 'center', display: 'flex' }}>
                <Grid container justify='center' alignItems='center' className={classes.root} spacing={2}>

                    <Grid container direction='column' item md={3} xs={12} className={classes.pannelone}>
                        <Typography variant='h5'>Chat Rooms</Typography>
                        <Divider/>
                        <Button className={classes.btn} onClick={() => setRoom('jokes')}>
                            General 🗿
                </Button> <br />
                        <Button className={classes.btn} onClick={() => setRoom('general')}>
                            Jokes 🤣
                </Button> <br />

                        <Button className={classes.btn} onClick={() => setRoom('gaming')}>
                            Gaming 🕹
                </Button> <br />

                        <Button className={classes.btn} onClick={() => setRoom('sports')}>
                            Sports 🏀
                </Button> <br />

                        <Button className={classes.btn} onClick={() => setRoom('advice')}>
                            Advice 🗣
                </Button> <br />

                        <Button className={classes.btn} onClick={() => setRoom('memes')}>
                            Memes 😂
                </Button> <br />

                        <Button className={classes.btn} onClick={() => setRoom('school')}>
                            School 📚
                </Button> <br />

                        <Button className={classes.btn} onClick={() => setRoom('events')}>
                            Events 🎉
                </Button> <br />

                        <Button className={classes.btn} onClick={() => setRoom('business')}>
                            Business 💰
                </Button> <br />


                    </Grid>


                    <Grid item md={3} xs={12} className={classes.panneltwo}>
                        <div style={{display:'flex', justifyContent:'space-between'}}> 
                        <Typography style={{alignSelf:'center'}}>Participants                    
                        </Typography>
                        <Button style={{ textTransform: 'none', backgroundColor: 'white' }} onClick={logout}>Logout</Button>
                        </div>
                        <Divider/>
                        <DisplayParticipants />



                    </Grid>


                    <Grid item md={5} xs={12} className={classes.pannelthree}>

                        <Grid id='chatbox' item className={classes.chat}>
                            <DisplayMessage style={{ color: 'white' }} />
                        </Grid>

                        <Grid item className={classes.chatbox}>
                            <div style={{ backgroundColor: '#F5F5F5', borderRadius: '25px', height: '40px', display: 'flex', justifyContent: 'space-around' }}>
                                <TextField onKeyDown={handleEnter} label='send a message...' variant='standard' value={input} onChange={(e) => setInput(e.target.value)} style={{ paddingBottom: '2px', width: '75%', alignSelf: 'flex-end' }}>


                                </TextField>
                                <IconButton style={{ paddingLeft: '10px' }} color='primary' size='small' onClick={() => messageBox()}>
                                    <SendIcon />
                                </IconButton>
                            </div>

                        </Grid>
                    </Grid>
                </Grid >
            </div>
        </>
    )
}

export default Chat