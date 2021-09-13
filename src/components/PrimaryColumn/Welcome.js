import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import Typography from "@material-ui/core/Typography";
import RoundButton from "../layout/RoundButton";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "auto",
    marginTop: theme.spacing(8),
    alignSelf: "center",
    maxWidth: '20rem',
  },
}));

export default function Welcome({display}) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      {display && <>
        <Box className={classes.root}>
            <Box
              fontWeight="fontWeightBold"
              fontSize="h4.fontSize"
              mb={1}
            >{`Welcome to Twitter!`}</Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >{`This is the best place to see what’s happening in your world. Find some people and topics to follow now.`}</Typography>
            <Box mt={3}>
              <RoundButton size="large" color="primary" variant="contained" onClick={() => history.push('/connect')}>{`Let's go!`}</RoundButton>
            </Box>
        </Box>
      </>}
    </>
  );
}
