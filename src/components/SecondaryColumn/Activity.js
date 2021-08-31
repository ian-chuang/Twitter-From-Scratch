import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link'
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

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
        borderRadius: theme.spacing(0,0,2,2),
    }
}))

export default function Activity({children}) {      

    const classes = useStyles()

    const activity = [
        {message: "SexyMemeLord69 followed you.", date: "Sat Aug 21 2021"},
        {message: "Warlus followed you.", date: "Sat Aug 21 2021"},
        {message: "Miles Zombie Stamp followed you.", date: "Sat Aug 21 2021"},
        {message: "Rachit followed you.", date: "Sat Aug 21 2021"}
    ]

    return (
        <Paper className={classes.root}>
            
            <List className={classes.list}>
                <ListItem className={classes.listItem}>
                    <Typography variant="h6">What's happening</Typography>
                </ListItem>
                {activity && activity.map((item, i) => (
                    <ListItem key={i} className={classes.listItem} button>
                        <ListItemAvatar>
                            <Avatar/>
                        </ListItemAvatar>
                        <ListItemText
                            secondary={item.date}
                        >
                            <Typography variant="body2">{item.message}</Typography>
                        </ListItemText>
                    </ListItem>
                ))}  
                <ListItem className={classes.showMore} button>
                    <Link href="#" style={{textDecoration: 'none'}}>
                        Show more
                    </Link>
                </ListItem>
            </List>
            
        </Paper>
    )
}
