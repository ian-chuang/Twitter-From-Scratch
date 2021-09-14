import Navigation from "../layout/Navigation";
import PrimaryColumn from "../PrimaryColumn/PrimaryColumn";
import Header from "../PrimaryColumn/Header";
import SecondaryColumn from "../SecondaryColumn/SecondaryColumn";
import Search from "../SecondaryColumn/Search";
import FollowMenu from "../SecondaryColumn/FollowMenu";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LargeActivity from "../PrimaryColumn/LargeActivity";

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

export default function ActivityPage() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Navigation />

      <PrimaryColumn>
        <Header title="Activity" backButton={true} />
        <LargeActivity />
      </PrimaryColumn>

      <SecondaryColumn>
        <Search />
        <FollowMenu />
      </SecondaryColumn>
    </Container>
  );
}
