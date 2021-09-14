import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import CachedIcon from "@material-ui/icons/Cached";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import Typography from "@material-ui/core/Typography";
import Avatar from "../layout/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Image from "../layout/Image";
import Link from "@material-ui/core/Link";
import { useHistory } from "react-router";
import { firestore } from "../../firebase/config";
import firebase from "firebase/app";
import { useSelector } from "react-redux";
import { fetchUser } from "../../services/firebase";
import CreateTweet from "./CreateTweet";

const useStyles = makeStyles((theme) => ({
  tweet: {
    display: "flex",
    alignItems: "flex-start",
    padding: theme.spacing(2, 2, 0, 2),
  },
  content: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  tweetInfo: {
    display: "flex",
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  tweetMessage: {
    whiteSpace: "pre-line",
    marginBottom: theme.spacing(2),
  },
  tweetImage: {
    marginBottom: theme.spacing(2),
  },
  iconButton: {
    padding: theme.spacing(1),
  },
}));

export default function MainTweet({ tweet, replies }) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const [user, setUser] = useState(null);
  const { user: currentUser } = useSelector((state) => state.user);

  const [likes, setLikes] = useState(null);
  const [toggleLiked, setToggledLiked] = useState(null);
  const [retweets, setRetweets] = useState(null);
  const [toggleRetweet, setToggledRetweet] = useState(null);

  const date = tweet?.timestamp?.toDate();

  const handleToggledLiked = async () => {
    setToggledLiked((toggleLiked) => !toggleLiked);

    await firestore
      .collection("tweets")
      .doc(tweet.id)
      .update({
        likes: toggleLiked
          ? firebase.firestore.FieldValue.arrayRemove(currentUser.username)
          : firebase.firestore.FieldValue.arrayUnion(currentUser.username),
      });

    await firestore
      .collection("users")
      .doc(currentUser.username)
      .update({
        likes: toggleLiked
          ? firebase.firestore.FieldValue.arrayRemove(tweet.id)
          : firebase.firestore.FieldValue.arrayUnion(tweet.id),
      });

    setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
  };

  const handleToggledRetweet = async () => {
    setToggledRetweet((toggleRetweet) => !toggleRetweet);

    await firestore
      .collection("tweets")
      .doc(tweet.id)
      .update({
        retweets: toggleRetweet
          ? firebase.firestore.FieldValue.arrayRemove(currentUser.username)
          : firebase.firestore.FieldValue.arrayUnion(currentUser.username),
      });

    await firestore
      .collection("users")
      .doc(currentUser.username)
      .update({
        retweets: toggleRetweet
          ? firebase.firestore.FieldValue.arrayRemove(tweet.id)
          : firebase.firestore.FieldValue.arrayUnion(tweet.id),
      });

    setRetweets((retweets) => (toggleRetweet ? retweets - 1 : retweets + 1));
  };

  useEffect(async () => {
    setUser(await fetchUser(tweet?.username));
    setLikes(tweet?.likes?.length);
    setToggledLiked(currentUser?.likes?.includes(tweet?.id));
    setRetweets(tweet?.retweets?.length);
    setToggledRetweet(currentUser?.retweets?.includes(tweet?.id));
  }, [tweet]);

  const tweetOptions = [
    {
      text: "Reply",
      icon: <ChatBubbleOutlineIcon />,
      value: replies,
      action: null,
      color: "#fff",
      activated: false,
    },
    {
      text: "Retweet",
      icon: <CachedIcon />,
      value: retweets,
      action: handleToggledRetweet,
      color: "rgb(0, 186, 124)",
      activated: toggleRetweet,
    },
    {
      text: "Like",
      icon: toggleLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />,
      value: likes,
      action: handleToggledLiked,
      color: "rgb(249, 24, 128)",
      activated: toggleLiked,
    },
    {
      text: "Share",
      icon: <ShareIcon />,
      value: null,
      action: null,
      color: "#fff",
      activated: false,
    },
  ];

  return (
    <>
      {tweet && user && (
        <>
          <div className={classes.tweet}>
            <Box className={classes.content}>
              <Box className={classes.tweetInfo}>
                <Avatar
                  className={classes.avatar}
                  src={user.profilePictureURL}
                ></Avatar>
                <Box>
                  <Link
                    variant="body1"
                    color="textPrimary"
                    component={"span"}
                    onClick={() => history.push(`/profile/${tweet.username}`)}
                  >
                    <Box fontWeight="fontWeightMedium">{user.name}</Box>
                  </Link>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    component={"span"}
                    noWrap={true}
                  >
                    {`@${user.username}`}
                  </Typography>
                </Box>
              </Box>

              {tweet.message?.length > 0 && (
                <Box fontSize={24} className={classes.tweetMessage}>
                  {tweet.message}
                </Box>
              )}

              <Image
                src={tweet.imageUrl}
                className={classes.tweetImage}
                contain={false}
              />

              <Box mb={2}>
                {[
                  date.toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  }),
                  " · ",
                  `${date.toLocaleString("en-us", {
                    month: "short",
                  })} ${date.getDate()}, ${date.getFullYear()}`,
                  " · ",
                  "Twitter Web App",
                ].map((text, i) => (
                  <Typography
                    key={i}
                    variant="body1"
                    color="textSecondary"
                    component={"span"}
                    noWrap={true}
                  >
                    {text}
                  </Typography>
                ))}
              </Box>

              <Divider />

              <Box display="flex" alignItems="center" my={2}>
                {tweetOptions.slice(0, -1).map((option, i) => (
                  <Box mr={2} key={i}>
                    <Typography variant="body1" component="span">
                      {option.value}
                    </Typography>
                    <Typography
                      variant="body1"
                      component="span"
                      color="textSecondary"
                    >
                      {" "}
                      {option.text}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Divider />

              <Box display="flex" justifyContent="space-around" my={0.75}>
                {tweetOptions.map((option, i) => (
                  <IconButton
                    style={{
                      color: option.activated
                        ? option.color
                        : theme.palette.text.secondary,
                    }}
                    onClick={option.action}
                    className={classes.iconButton}
                  >
                    {React.cloneElement(option.icon, {
                      style: { fontSize: 24 },
                    })}
                  </IconButton>
                ))}
              </Box>
              <Divider />
            </Box>
          </div>

          <CreateTweet parent={tweet?.id} />
        </>
      )}
    </>
  );
}
