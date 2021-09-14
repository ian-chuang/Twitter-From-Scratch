import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "../layout/Avatar";
import Typography from "@material-ui/core/Typography";
import { fetchActivity } from "../../services/firebase";
import timeDifference from "../../services/timeDifference";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
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

export default function LargeActivity() {
  const classes = useStyles();
  const history = useHistory();

  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const unsubscribe = fetchActivity(setActivity);
    return () => unsubscribe();
  }, []);

  return (
    <List className={classes.list}>
      {activity &&
        activity.map((item, i) => (
          <ListItem
            key={i}
            className={classes.listItem}
            onClick={() => history.push(`/profile/${item.username}`)}
            button
          >
            <Avatar className={classes.avatar} src={item?.profilePictureURL} />
            <ListItemText secondary={timeDifference(item.timestamp?.toDate())}>
              <Typography variant="body2">{item?.message}</Typography>
            </ListItemText>
          </ListItem>
        ))}
    </List>
  );
}
