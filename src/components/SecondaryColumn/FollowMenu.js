import React, {useEffect, useState} from 'react'
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
import FollowButton from '../layout/FollowButton';
import Box from '@material-ui/core/Box'
import { firestore } from '../../firebase/config';
import { useSelector } from 'react-redux';
import firebase from 'firebase/app';
import {useHistory} from 'react-router-dom';
import { fetchPeopleToFollow } from '../../services/firebase';

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
    const history = useHistory();

    const {user:currentUser} = useSelector(state => state.user);
    const [users, setUsers] = useState(null);

    useEffect(async () => {
        setUsers(await fetchPeopleToFollow(currentUser));
    }, [])

    return (
        <Paper className={classes.root}>
            
            <List className={classes.list}>
                <ListItem className={classes.listItem}>
                    <Typography variant="h6">Who to follow</Typography>
                </ListItem>
                {users && users.map((user, i) => (
                    <ListItem key={i} className={classes.listItem} button onClick={() => history.push(`/profile/${user.username}`)}>
                        <ListItemAvatar>
                            <Avatar src={user.profilePictureURL}/>
                        </ListItemAvatar>
                        <ListItemText
                            secondary={`@${user.username}`}
                        >
                            <Typography variant="body2" component={'span'}><Box fontWeight="fontWeightMedium">{user.name}</Box></Typography>
                        </ListItemText>
                        <ListItemSecondaryAction>
                            <FollowButton size="small" user={user}>Follow</FollowButton>
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
