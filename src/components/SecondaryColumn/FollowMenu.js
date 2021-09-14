import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Link from "@material-ui/core/Link";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import FollowButton from "../layout/FollowButton";
import Box from "@material-ui/core/Box";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchPeopleToFollowLimit } from "../../services/firebase";
import Avatar from "../layout/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.spacing(2),
  },
  list: {
    padding: 0,
  },
  listItem: {
    padding: theme.spacing(1.5, 2),
  },
  showMore: {
    padding: theme.spacing(1.5, 2),
    borderRadius: theme.spacing(0, 0, 2, 2),
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

export default function FollowMenu() {
  const classes = useStyles();
  const history = useHistory();

  const { user: currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState(null);

  useEffect(async () => {
    setUsers(await fetchPeopleToFollowLimit(currentUser));
  }, []);

  return (
    <>
      {users && (
        <Paper className={classes.root}>
          <List className={classes.list}>
            <ListItem className={classes.listItem}>
              <Typography variant="h6">Who to follow</Typography>
            </ListItem>
            {users &&
              users.map((user, i) => (
                <ListItem
                  key={i}
                  className={classes.listItem}
                  button
                  onClick={() => history.push(`/profile/${user.username}`)}
                >
                  <Avatar
                    src={user.profilePictureURL}
                    className={classes.avatar}
                  />
                  <ListItemText secondary={`@${user.username}`}>
                    <Typography variant="body2" component={"span"}>
                      <Box fontWeight="fontWeightMedium">{user.name}</Box>
                    </Typography>
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <FollowButton size="small" user={user}>
                      Follow
                    </FollowButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            <ListItem
              className={classes.showMore}
              onClick={() => history.push("/connect")}
              button
            >
              <Link href="#" style={{ textDecoration: "none" }}>
                Show more
              </Link>
            </ListItem>
          </List>
        </Paper>
      )}
    </>
  );
}
