import Navigation from "../layout/Navigation";
import PrimaryColumn from "../PrimaryColumn/PrimaryColumn";
import Header from "../PrimaryColumn/Header";
import SecondaryColumn from "../SecondaryColumn/SecondaryColumn";
import Search from "../SecondaryColumn/Search";
import Activity from "../SecondaryColumn/Activity";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LargeFollowMenu from "../PrimaryColumn/LargeFollowMenu";

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

export default function Connect() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Navigation />

      <PrimaryColumn>
        <Header title="Connect" backButton={true} />
        <LargeFollowMenu />
      </PrimaryColumn>

      <SecondaryColumn>
        <Search />
        <Activity />
      </SecondaryColumn>
    </Container>
  );
}
