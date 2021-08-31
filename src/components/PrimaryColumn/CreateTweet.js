import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import RoundButton from "../layout/RoundButton";
import ImageIcon from "@material-ui/icons/Image";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import GifIcon from "@material-ui/icons/Gif";
import MoodIcon from "@material-ui/icons/Mood";
import PollIcon from "@material-ui/icons/Poll";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import { firestore, auth } from "../../firebase/config";
import firebase from "firebase/app";
import Divider from '@material-ui/core/Divider'

const CHARACTER_LIMIT = 140;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "flex-start",
    padding: theme.spacing(2, 2),
  },
  input: {
    padding: theme.spacing(0.5, 0),
    marginBottom: theme.spacing(1),
  },
  iconButton: {
    padding: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  progress: {
    marginLeft: 'auto',
    marginRight: theme.spacing(2),
    fontSize: '16',
  }
}));

export default function CreateTweet({divider=true, minRows=1, onSend=null}) {
  const classes = useStyles();

  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);

  const tweetOptions = [
    { text: "Image", icon: <ImageIcon />, action: null },
    { text: "GIF", icon: <GifIcon />, action: null },
    { text: "Emoji", icon: <MoodIcon />, action: null },
    { text: "Poll", icon: <PollIcon />, action: null },
  ];

  const handleTextField = (e) => {
      const value = e.target.value;
      setMessage(value);
      setProgress(value.length / CHARACTER_LIMIT * 100);
  }

  const handleSendTweet = (e) => {
    e.preventDefault();
    
    setMessage('');

    firestore.collection("tweets").add({
      uid: auth.currentUser.uid,
      message: message,
      parent: null,
      replies: [],
      imageUrl: null,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      likes: 0,
    });

    if (onSend) onSend();
  };

  return (
    <>
      <form className={classes.root} onSubmit={handleSendTweet}>
        <Avatar>I</Avatar>

        <Box display="flex" flexDirection="column" ml={2} width="100%">
          <TextField
            className={classes.input}
            placeholder="What's happening?"
            type="text"
            onChange={handleTextField}
            multiline
            InputProps={{ style: { fontSize: 20 }, disableUnderline: true }}
            maxRows={20}
            minRows={minRows}
          />
          <Box display="flex" alignItems="center">
            {tweetOptions.map((option, i) => (
              <IconButton
                className={classes.iconButton}
                color="primary"
                aria-label={option.text}
                key={i}
              >
                {React.cloneElement(option.icon, {
                  fontSize: "small",
                })}
              </IconButton>
            ))}
            <CircularProgress className={classes.progress} variant="determinate" value={Math.min(100, progress)} color={progress > 100 ? '' : 'primary'} size={30} thickness={5}/>
            <RoundButton
                type="submit"
                color="primary"
                variant="contained"
                disabled={progress > 100 || message.length === 0}
            >
                Tweet      
            </RoundButton>
          </Box>
        </Box>
      </form>
      {divider && <Divider/>}
    </>
  );
}
