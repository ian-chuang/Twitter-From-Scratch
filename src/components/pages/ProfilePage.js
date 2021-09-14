import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navigation from "../layout/Navigation";
import PrimaryColumn from "../PrimaryColumn/PrimaryColumn";
import Header from "../PrimaryColumn/Header";
import Profile from "../PrimaryColumn/Profile";
import ProfileNotFound from "../PrimaryColumn/ProfileNotFound";
import Timeline from "../PrimaryColumn/Timeline";
import SecondaryColumn from "../SecondaryColumn/SecondaryColumn";
import Search from "../SecondaryColumn/Search";
import Activity from "../SecondaryColumn/Activity";
import FollowMenu from "../SecondaryColumn/FollowMenu";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { fetchUserSnapshot, fetchUserTimeline } from "../../services/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "flex-start",
    "&::before, &::after": {
      content: '""',
      margin: "auto",
    },
  },
}));

export default function ProfilePage() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [timeline, setTimeline] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    const unsubscribe = [];
    unsubscribe.push(fetchUserSnapshot(username, setUser));
    unsubscribe.push(fetchUserTimeline(username, setTimeline));
    return () => unsubscribe.forEach((fcn) => fcn());
  }, [username]);

  return (
    <Container className={classes.root}>
      <Navigation />

      <PrimaryColumn>
        <Header backButton={true} title={username} />
        <Profile user={user} />
        {user === undefined && <ProfileNotFound username={username} />}
        <Timeline tweets={timeline} />
      </PrimaryColumn>

      <SecondaryColumn>
        <Search />
        <Activity />
        <FollowMenu />
      </SecondaryColumn>
    </Container>
  );
}
