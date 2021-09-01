import React, { useState, useRef, useEffect } from "react";
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
import { firestore, auth, storage } from "../../firebase/config";
import firebase from "firebase/app";
import Divider from "@material-ui/core/Divider";
import Image from "../layout/Image";
import { v4 as uuidv4 } from 'uuid';

const CHARACTER_LIMIT = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "flex-start",
    padding: theme.spacing(2),
  },
  content: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginLeft: theme.spacing(2),
    gap: theme.spacing(2),
  },
  iconButton: {
    padding: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  progress: {
    marginLeft: "auto",
    marginRight: theme.spacing(2),
    fontSize: "16",
  },
}));

export default function CreateTweet({
  divider = true,
  minRows = 1,
  onSend = null,
}) {
  const classes = useStyles();

  const messageRef = useRef();
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const tweetOptions = [
    { text: "GIF", icon: <GifIcon />, action: null },
    { text: "Emoji", icon: <MoodIcon />, action: null },
    { text: "Poll", icon: <PollIcon />, action: null },
  ];

  const handleTextField = (e) => {
    const value = e.target.value;
    setMessage(value);
    setProgress((value.length / CHARACTER_LIMIT) * 100);
  };

  const handleInputImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(null)
      return
    }
    setFile(e.target.files[0]);
    e.target.value = "";
  }

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  const handleSendTweet = (e) => {
    e.preventDefault();

    const addTweet = (imageUrl) => {
      firestore.collection("tweets").add({
        uid: auth.currentUser.uid,
        message: message,
        parent: null,
        replies: [],
        imageUrl: imageUrl,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        likes: 0,
      });
    }

    if (file && preview) {
      const storageRef = storage.ref(`${uuidv4()}-${file.name}`);

      storageRef
      .put(file)
      .then( async () => {
          const imageUrl = await storageRef.getDownloadURL();
          addTweet(imageUrl);
      })
    }
    else {
      addTweet(null);
    }

    setMessage("");
    setProgress(0);
    messageRef.current.value = "";
    setPreview(null);
    setFile(null);

    if (onSend) onSend();
  };

  return (
    <>
      <form className={classes.root} onSubmit={handleSendTweet}>
        <Avatar>I</Avatar>

        <Box className={classes.content}>
          <TextField
            inputRef={messageRef}
            placeholder="What's happening?"
            type="text"
            onChange={handleTextField}
            multiline
            InputProps={{ style: { fontSize: 20 }, disableUnderline: true }}
            maxRows={20}
            minRows={preview ? 1 : minRows}
          />

          <Image src={preview} setSrc={setPreview}/>

          <Box display="flex" alignItems="center">
              
            <IconButton
              className={classes.iconButton}
              color="primary"
              component="label"
            >
              <input type="file" onChange={handleInputImage} hidden/>
              <ImageIcon/>
            </IconButton>

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
            <CircularProgress
              className={classes.progress}
              variant="determinate"
              value={Math.min(100, progress)}
              color={progress > 100 ? "" : "primary"}
              size={30}
              thickness={5}
            />
            <RoundButton
              type="submit"
              color="primary"
              variant="contained"
              disabled={progress > 100 || (message.length === 0 && (!file || !preview)) }
            >
              Tweet
            </RoundButton>
          </Box>
        </Box>
      </form>
      {divider && <Divider />}
    </>
  );
}
