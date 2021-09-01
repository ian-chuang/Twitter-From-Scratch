import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import CachedIcon from "@material-ui/icons/Cached";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShareIcon from "@material-ui/icons/Share";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import RoundButton from "../layout/RoundButton";
import Divider from '@material-ui/core/Divider'

import timeDifference from "../../services/timeDifference";

const useStyles = makeStyles((theme) => ({
  tweet: {
    display: "flex",
    alignItems: "flex-start",
    padding: theme.spacing(2, 2),
  },
  tweetInfo: {
    display: "flex",
    gap: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
  },
  tweetMessage: {
    whiteSpace: 'pre-line',
  },
  tweetButton: {
    marginLeft: "auto",
  },
  iconButton: {
    padding: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export default function Tweet({ tweet, divider=true }) {
  const classes = useStyles();

  const tweetOptions = [
    { text: "Reply", icon: <ChatBubbleOutlineIcon />, action: null },
    { text: "Retweet", icon: <CachedIcon />, action: null },
    { text: "Like", icon: <FavoriteBorderIcon />, action: null },
    { text: "Share", icon: <ShareIcon />, action: null },
  ];

  return (
    <>
      {tweet && (
        <>
          <div className={classes.tweet}>
            <Avatar>I</Avatar>
            <Box ml={2} width="100%">
              <Box className={classes.tweetInfo}>
                <Typography variant="body2" color="textPrimary" component={'span'}>
                  <Box fontWeight="fontWeightMedium">Ian Chuang</Box>
                </Typography>
                {tweet.timestamp && [
                  "@icheester",
                  "·",
                  timeDifference(tweet.timestamp.toDate()),
                ].map((info, i) => (
                  <Typography key={i} variant="body2" color="textSecondary" component={'span'}>
                    {info}
                  </Typography>
                ))}
              </Box>

              <Typography variant="body2" color="textPrimary" className={classes.tweetMessage}>
                {tweet.message}
              </Typography>

              <Box display="flex" alignItems="center" mt={1}>
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
          {divider && <Divider/>}
        </>
      )}
    </>
  );
}
