import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import RoundButton from '../layout/RoundButton';
import ImageIcon from '@material-ui/icons/Image';
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import GifIcon from '@material-ui/icons/Gif';
import MoodIcon from '@material-ui/icons/Mood';
import PollIcon from '@material-ui/icons/Poll';
import IconButton from '@material-ui/core/IconButton'
import { firestore, auth } from '../../firebase/config';
import firebase from 'firebase/app';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'flex-start',
        padding: theme.spacing(2,2),
        borderBottom: 'solid 1px',
        borderBottomColor: theme.palette.grey[800],
    },
    input : {
        padding: theme.spacing(.5, 0),
        marginBottom: theme.spacing(1)
    },
    tweetButton: {
        marginLeft: 'auto',
    },
    iconButton: {
        padding: theme.spacing(1),
        marginRight: theme.spacing(1),
    }
}))

export default function CreateTweet() {

    const classes = useStyles();

    const [message, setMessage] = useState('');

    const tweetOptions = [
        {text: 'Image', icon: <ImageIcon/>, action: null},
        {text: 'GIF', icon: <GifIcon/>, action: null},
        {text: 'Emoji', icon: <MoodIcon/>, action: null},
        {text: 'Poll',icon: <PollIcon/>, action: null},
    ]

    const handleSendTweet = (e) => {
        e.preventDefault();
        console.log(message);
        firestore.collection('tweets').add({
            uid: auth.currentUser.uid,
            message: message,
            parent: null,
            replies: [],
            imageUrl: null,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            likes: 0,
        })
    }

    return (
        <div className={classes.root}>
            <Avatar>I</Avatar>

            <Box display="flex" flexDirection="column" ml={2} width="100%">
                <TextField className={classes.input}
                    placeholder="What's happening?" type="text" onChange={e => setMessage(e.target.value)}
                    multiline InputProps={{style: { fontSize: 20 }, disableUnderline: true }}
                />
                <Box display="flex" alignItems="center">
                    { tweetOptions.map((option, i) => (
                        <IconButton className={classes.iconButton} color="primary" aria-label={option.text} key={i}>
                            {React.cloneElement(
                                option.icon,
                                {
                                    fontSize:"small",
                                }
                            )}
                        </IconButton>
                    ))}
                    <RoundButton className={classes.tweetButton} color="primary" variant="contained" onClick={handleSendTweet}>Tweet</RoundButton>
                </Box>
            </Box>
        </div>
    )
}
