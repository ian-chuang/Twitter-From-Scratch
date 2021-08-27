import React, {useEffect} from 'react'
import { useHistory } from 'react-router';
import { fetchUser, fetchUserTimeline } from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { auth, firestore } from '../../firebase/config';
import firebase from 'firebase/app';

import Navigation from '../layout/Navigation';
import Header from '../layout/Header';
import CreateTweet from '../tweets/CreateTweet';
import Feed from '../tweets/Feed';
import SecondaryColumn from '../secondary_column/SecondaryColumn';
import Search from '../secondary_column/Search';
import Activity from '../secondary_column/Activity';
import FollowMenu from '../secondary_column/FollowMenu';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        maxWidth: '38rem',
        flexGrow: 2,
        borderRight: '1px solid',
        borderRightColor: theme.palette.grey[800],
        borderLeft: '1px solid',
        borderLeftColor: theme.palette.grey[800],
    },
}))

export default function Home() {   
    const {currentUser, timeline} = useSelector(state => state.userState)
    

    const classes = useStyles()
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchUser());
        dispatch(fetchUserTimeline());
    }, [])

    

    const handleLogout = () => {
        auth.signOut()
        .then(() => history.push('/login'))
        .catch((err) => console.log(err))
    }

    

    return (
        <Container className={classes.root}>
            <Navigation/>
            <Box className={classes.content}>
                <Header title="Home"/>

                <CreateTweet/>

                {timeline && 
                    <Feed tweets={timeline}/>
                }

            </Box>

            <SecondaryColumn>
                <Search/>
                <Activity/>
                <FollowMenu/>
            </SecondaryColumn>
        </Container>
    )
}
