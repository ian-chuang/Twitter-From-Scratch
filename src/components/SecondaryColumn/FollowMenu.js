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
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import RoundButton from '../layout/RoundButton';

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

export default function FollowMenu() {      

    const classes = useStyles()

    const followList = [
        {name: "SexyMemeLord69", handle: "@69420DankGod"},
        {name: "Warlus", handle: "@warlus-trades"},
    ]

    return (
        <Paper className={classes.root}>
            
            <List className={classes.list}>
                <ListItem className={classes.listItem}>
                    <Typography variant="h6">Who to follow</Typography>
                </ListItem>
                {followList && followList.map((item, i) => (
                    <ListItem key={i} className={classes.listItem} button>
                        <ListItemAvatar>
                            <Avatar/>
                        </ListItemAvatar>
                        <ListItemText
                            secondary={item.handle}
                        >
                            <Typography variant="body2">{item.name}</Typography>
                        </ListItemText>
                        <ListItemSecondaryAction>
                            <RoundButton size="small" color="secondary" variant="contained">Follow</RoundButton>
                        </ListItemSecondaryAction>
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
