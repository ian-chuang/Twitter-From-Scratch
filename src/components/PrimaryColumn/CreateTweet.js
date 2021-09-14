import React, { useState} from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import RoundButton from "../layout/RoundButton";
import ImageIcon from "@material-ui/icons/Image";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Avatar from "../layout/Avatar";
import GifIcon from "@material-ui/icons/Gif";
import MoodIcon from "@material-ui/icons/Mood";
import PollIcon from "@material-ui/icons/Poll";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import { firestore } from "../../firebase/config";
import firebase from "firebase/app";
import Divider from "@material-ui/core/Divider";
import Image from "../layout/Image";
import useStorage from "../../services/useStorage";
import { useSelector } from "react-redux";
import { addActivity } from "../../services/firebase";
import Tooltip from "@material-ui/core/Tooltip";

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
  textField: {},
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
  parent = null,
}) {
  const classes = useStyles();
  const theme = useTheme();

  const { user } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, file, handleInputImage, uploadImage, removeImage] =
    useStorage();

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

  const handleSendTweet = async (e) => {
    e.preventDefault();

    setLoading(true);

    firestore.collection("tweets").add({
      username: user.username,
      message: message,
      parent: parent,
      imageUrl: await uploadImage(),
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      likes: [],
      retweets: [],
      replies: [],
    });

    setMessage("");
    setProgress(0);
    setLoading(false);

    addActivity(user.username, `${user.name} tweeted something.`);

    if (onSend) onSend();
  };

  const disableButton =
    message.length > CHARACTER_LIMIT ||
    (message.length === 0 && (!file || !preview)) ||
    loading;

  return (
    <>
      <form className={classes.root} onSubmit={handleSendTweet}>
        <Avatar
          src={
            user &&
            (user.profilePictureURL
              ? user.profilePictureURL
              : "/profile_picture.png")
          }
        ></Avatar>

        <Box className={classes.content}>
          <TextField
            className={classes.textField}
            placeholder={parent ? "Tweet your reply" : "What's happening?"}
            type="text"
            onChange={handleTextField}
            value={message}
            multiline
            InputProps={{ style: { fontSize: 20 }, disableUnderline: true }}
            maxRows={20}
            minRows={preview ? 1 : minRows}
          />

          <Image src={preview} removeImage={removeImage} />

          <Box display="flex" alignItems="center">
            <IconButton
              className={classes.iconButton}
              color="primary"
              component="label"
            >
              <input type="file" onChange={handleInputImage} hidden />
              <ImageIcon />
            </IconButton>

            {tweetOptions.map((option, i) => (
              <Tooltip title="Not functional" key={i} arrow>
                <IconButton
                  className={classes.iconButton}
                  color="primary"
                  aria-label={option.text}
                  
                >
                  {React.cloneElement(option.icon, {
                    fontSize: "small",
                  })}
                </IconButton>
              </Tooltip>
            ))}
            <CircularProgress
              className={classes.progress}
              variant="determinate"
              value={Math.min(100, progress)}
              style={{
                color:
                  message.length > CHARACTER_LIMIT
                    ? theme.palette.error.main
                    : theme.palette.primary.main,
              }}
              size={30}
              thickness={5}
            />
            <RoundButton
              type="submit"
              color="primary"
              variant="contained"
              disabled={disableButton}
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
