import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import CachedIcon from "@material-ui/icons/Cached";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShareIcon from "@material-ui/icons/Share";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import RoundButton from "../layout/RoundButton";
import Divider from "@material-ui/core/Divider";
import Image from "../layout/Image";
import Link from "@material-ui/core/Link";
import { useHistory } from "react-router";
import { firestore } from "../../firebase/config";
import firebase from "firebase/app";
import { useSelector } from "react-redux";
import { fetchUser } from "../../services/firebase";

import timeDifference from "../../services/timeDifference";

const useStyles = makeStyles((theme) => ({
  tweet: {
    display: "flex",
    alignItems: "flex-start",
    padding: theme.spacing(1.75, 2, 1, 2),
    cursor: "pointer",
    zIndex: -1,
  },
  content: {
    marginLeft: theme.spacing(2),
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  tweetInfo: {
    display: "flex",
    gap: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
  },
  tweetMessage: {
    whiteSpace: "pre-line",
    marginBottom: theme.spacing(1),
  },
  tweetImage: {
    margin: theme.spacing(0.5, 0, 0.5, 0),
  },
  iconButton: {
    padding: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export default function Tweet({ tweet, divider = true }) {
  const classes = useStyles();
  const history = useHistory();

  const [user, setUser] = useState(null);
  const { user: currentUser } = useSelector((state) => state.user);

  const [likes, setLikes] = useState(tweet?.likes?.length);
  const [toggleLiked, setToggledLiked] = useState(
    currentUser?.likes?.includes(currentUser.username)
  );
  const [retweets, setRetweets] = useState(tweet?.retweets?.length);
  const [toggleRetweet, setToggledRetweet] = useState(
    currentUser?.retweets?.includes(currentUser.username)
  );

  const handleToggledLiked = async (e) => {
    e.stopPropagation();

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

  const handleToggledRetweet = async (e) => {
    e.stopPropagation();

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
  }, [tweet]);

  const tweetOptions = [
    {
      text: "Reply",
      icon: <ChatBubbleOutlineIcon />,
      value: tweet?.replies?.length,
      action: null,
    },
    {
      text: "Retweet",
      icon: <CachedIcon />,
      value: retweets,
      action: handleToggledRetweet,
    },
    {
      text: "Like",
      icon: <FavoriteBorderIcon />,
      value: likes,
      action: handleToggledLiked,
    },
    { text: "Share", icon: <ShareIcon />, value: null, action: null },
  ];

  return (
    <>
      {tweet && user && (
        <>
          <div
            className={classes.tweet}
            onClick={() => history.push(`/tweet/${tweet.id}`)}
          >
            <Avatar
              className={classes.avatar}
              src={user.profilePictureURL}
              onClick={(e) => {
                e.stopPropagation();
                history.push(`/profile/${tweet.username}`);
              }}
            />
            <Box className={classes.content}>
              <Box className={classes.tweetInfo}>
                <Link
                  variant="body2"
                  color="textPrimary"
                  component={"span"}
                  noWrap={true}
                  onClick={(e) => {
                    e.stopPropagation();
                    history.push(`/profile/${tweet.username}`);
                  }}
                >
                  <Box fontWeight="fontWeightMedium">{user.name}</Box>
                </Link>
                {tweet.timestamp &&
                  [
                    `@${user.username}`,
                    "·",
                    timeDifference(tweet.timestamp?.toDate()),
                  ].map((info, i) => (
                    <Typography
                      key={i}
                      variant="body2"
                      color="textSecondary"
                      component={"span"}
                      noWrap={true}
                    >
                      {info}
                    </Typography>
                  ))}
              </Box>

              {tweet.message?.length > 0 && (
                <Typography
                  variant="body2"
                  color="textPrimary"
                  className={classes.tweetMessage}
                >
                  {tweet.message}
                </Typography>
              )}

              <Image
                src={tweet.imageUrl}
                className={classes.tweetImage}
                showModal={false}
              />

              <Box display="flex" alignItems="center">
                {tweetOptions.map((option, i) => (
                  <Box width="100%" display="flex" alignItems="center" key={i}>
                    <RoundButton
                      color="primary"
                      aria-label={option.text}
                      size="small"
                      onClick={option.action}
                    >
                      {React.cloneElement(option.icon, {
                        style: { fontSize: 20 },
                      })}
                    </RoundButton>
                    {option.value > 0 && (
                      <Box ml={1} fontSize={14}>
                        {option.value}
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          </div>
          {divider && <Divider />}
        </>
      )}
    </>
  );
}
