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

export default function Home() {
  const classes = useStyles();
  const [timeline, setTimeline] = useState(null);
  const { user } = useSelector((state) => state.user);

  useEffect(async () => {
    let unsubscribe = fetchHomeTimeline(user, setTimeline);
    return () => unsubscribe();
  }, []);

  return (
    <Container className={classes.root}>
      <Navigation />

      <PrimaryColumn>
        <Header title="Home" />
        <CreateTweet />
        <Welcome display={timeline?.length === 0} />
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
