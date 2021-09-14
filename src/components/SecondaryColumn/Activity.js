import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Link from "@material-ui/core/Link";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "../layout/Avatar";
import Typography from "@material-ui/core/Typography";
import { fetchActivityLimit } from "../../services/firebase";
import timeDifference from "../../services/timeDifference";
import { useHistory } from "react-router";

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

export default function Activity() {
  const classes = useStyles();
  const history = useHistory();

  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const unsubscribe = fetchActivityLimit(setActivity);
    return () => unsubscribe();
  }, []);

  return (
    <Paper className={classes.root}>
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <Typography variant="h6">What's happening</Typography>
        </ListItem>
        {activity &&
          activity.map((item, i) => (
            <ListItem
              key={i}
              className={classes.listItem}
              onClick={() => history.push(`/profile/${item.username}`)}
              button
            >
              <Avatar
                className={classes.avatar}
                src={item?.profilePictureURL}
              />
              <ListItemText
                secondary={timeDifference(item.timestamp?.toDate())}
              >
                <Typography variant="body2">{item?.message}</Typography>
              </ListItemText>
            </ListItem>
          ))}
        <ListItem
          className={classes.showMore}
          onClick={() => history.push("/activity")}
          button
        >
          <Link href="#" style={{ textDecoration: "none" }}>
            Show more
          </Link>
        </ListItem>
      </List>
    </Paper>
  );
}
