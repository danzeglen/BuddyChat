import React, { useContext, useState } from 'react';
import { TextField, Button, Typography } from '@material-ui/core'
import { FirebaseContext } from './providers/auth'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden';
import laugh from './laugh.jpeg'
import { SocketContext } from './socketcontext';



const useStyles = makeStyles((theme) => ({
    square: {
        backgroundColor: 'white',
        height: '500px',
        minHeight: '500px',
        marginTop: '100px',
        marginLeft:'50px',
        minWidth: '300px',
        borderRadius: '20px',
        boxShadow: '5px 10px 10px #666666',
        [theme.breakpoints.down('sm')]: {
            marginTop: '20px',
            borderTopRightRadius: '20px',
            borderBottomRightRadius: '20px',
            minWidth: '300px',
            maxWidth: '300px'

        }
    },
    btn: {
        textTransform: 'none',
        backgroundColor: '#1298c9',
        color: 'white',
        height: '20px',
        marginTop: '5px'
    },
    displayname: {
        marginTop: '50px'
    },
    username: {
        marginTop: '40px'
    },
    img: {
        width: '80%',
        marginTop: '80px'
    },
    greeting: {
        fontFamily: 'Ubuntu'
    }
}))




const Login = () => {
    const { createAccount, login, guestname, setGuestName, setIsloggedin } = useContext(FirebaseContext)
    const {joinRoom} = useContext(SocketContext);
    const [username, SetUsername] = useState('');
    const [password, SetPassword] = useState('');
    const [islogin, setIsLogin] = useState(true);
    const classes = useStyles()

    function handleGuest() {
        console.log('ran')
        joinRoom(guestname, 'general')
        setIsloggedin(true);
    }



    return (
        <Grid container style={{ height: '100vh', width: '100vw', backgroundImage: `url(${laugh})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} justify='left' align='center'>


            {islogin
                ? <Grid item xs={12} md={3} style={{ backgroundColor: '' }}>
                    <div className={classes.square}>
                        <Typography variant='h4' style={{paddingTop:'10px'}}>BuddyChat</Typography>
                        <Typography>Chat with friends now!</Typography>
                        <TextField onChange={(e) => setGuestName(e.target.value)} className={classes.displayname} label='display name...'></TextField> <br />
                        <Button variant='contained' className={classes.btn} style={{ textDecoration: 'none' }} onClick={() => handleGuest()}>Join as guest</Button>

                        <form onSubmit={(e) => login(username, password, e)}>
                            <TextField className={classes.username} label='username' onChange={(e) => SetUsername(e.target.value)} /> <br />
                            <TextField variant='standard' label='password' onChange={(e) => SetPassword(e.target.value)} /> <br />
                            <Button variant='contained' className={classes.btn} type='submit'>Login</Button> <br />
                            <Button onClick={() => setIsLogin(prevLogin => !prevLogin)}>Create Account</Button>
                        </form>
                    </div>
                </Grid>


                :

                <Grid item xs={12} md={3}>
                    <div className={classes.square}>
                        <Typography variant='h4' style={{paddingTop:'10px'}}>BuddyChat</Typography>

                        <form onSubmit={(e) => login(username, password, e)} style={{paddingTop:'70px'}}>
                            <TextField label='display name...'></TextField> <br />
                            <TextField label='username' onChange={(e) => SetUsername(e.target.value)} /> <br />
                            <TextField variant='standard' label='password' onChange={(e) => SetPassword(e.target.value)} /> <br />
                            <Button variant='contained' className={classes.btn} type='submit'>Create Account</Button> <br />
                            <Button onClick={() => setIsLogin(prevLogin => !prevLogin)}>Login</Button>
                        </form>
                    </div>

                </Grid>

            }

        </Grid >
    );
};

export default Login;