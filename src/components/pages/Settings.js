import React, { useEffect, useState } from "react";
import Navigation from "../layout/Navigation";
import PrimaryColumn from "../PrimaryColumn/PrimaryColumn";
import Header from "../PrimaryColumn/Header";
import CreateTweet from "../PrimaryColumn/CreateTweet";
import Timeline from "../PrimaryColumn/Timeline";
import SecondaryColumn from "../SecondaryColumn/SecondaryColumn";
import Search from "../SecondaryColumn/Search";
import Activity from "../SecondaryColumn/Activity";
import FollowMenu from "../SecondaryColumn/FollowMenu";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useSelector } from "react-redux";
import { fetchHomeTimeline } from "../../services/firebase";
import Welcome from "../PrimaryColumn/Welcome";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "flex-start",
    "&::before, &::after": {
      content: '""',
      margin: "auto",
    },
  },
  list: {
    padding: 0,
  }
}));

export default function Settings() {
  const classes = useStyles();
  const { user } = useSelector((state) => state.user);

  const listItems = [
    {title: 'Username', info: `@${user?.username}`},
    {title: 'Name', info: user?.name},
    {title: 'Email', info: user?.email},
    {title: 'Account Creation', info: user?.createdAt.toDate().toString()},
  ]

  return (
    <Container className={classes.root}>
      <Navigation />

      <PrimaryColumn>
        <Header title="Settings" backButton={true} />
        <List className={classes.list}>
            {listItems.map((item, i) => (
              <ListItem
                key={i}
                className={classes.listItem}
                button
              >
                <ListItemText secondary={item.info}>
                  <Typography variant="body2" component={"span"}>
                    <Box fontWeight="fontWeightMedium">{item.title}</Box>
                  </Typography>
                </ListItemText>
              </ListItem>
            ))}
        </List>
      </PrimaryColumn>

      <SecondaryColumn copyright={false}></SecondaryColumn>
    </Container>
  );
}
