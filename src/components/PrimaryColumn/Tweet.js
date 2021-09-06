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

import timeDifference from "../../services/timeDifference";

const useStyles = makeStyles((theme) => ({
  tweet: {
    display: "flex",
    alignItems: "flex-start",
    padding: theme.spacing(1.75, 2, 1, 2),
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

  const tweetOptions = [
    { text: "Reply", icon: <ChatBubbleOutlineIcon />, action: null },
    { text: "Retweet", icon: <CachedIcon />, action: null },
    { text: "Like", icon: <FavoriteBorderIcon />, action: null },
    { text: "Share", icon: <ShareIcon />, action: null },
  ];

  useEffect(() => {
    firestore
      .collection("users")
      .doc(tweet.username)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setUser({ ...snapshot.data(), username: tweet.username });
        }
      });
  }, [tweet]);

  return (
    <>
      {tweet && user && (
        <>
          <div className={classes.tweet}>
            <Avatar className={classes.avatar} src={user.profilePictureURL}>I</Avatar>
            <Box className={classes.content}>
              <Box className={classes.tweetInfo}>
                <Link
                  variant="body2"
                  color="textPrimary"
                  component={"span"}
                  onClick={() => history.push(`/profile/${tweet.username}`)}
                >
                  <Box fontWeight="fontWeightMedium">{user.name}</Box>
                </Link>
                {tweet.timestamp &&
                  [
                    `@${user.username}`,
                    "·",
                    timeDifference(tweet.timestamp.toDate()),
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

              {tweet.message && tweet.message.length > 0 && (
                <Typography
                  variant="body2"
                  color="textPrimary"
                  className={classes.tweetMessage}
                >
                  {tweet.message}
                </Typography>
              )}

              <Image src={tweet.imageUrl} className={classes.tweetImage} />

              <Box display="flex" alignItems="center">
                {tweetOptions.map((option, i) => (
                  <Box width="100%" key={i}>
                    <RoundButton
                      color="primary"
                      startIcon={option.icon}
                      aria-label={option.text}
                      size="small"
                    >
                      {20}
                    </RoundButton>
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
