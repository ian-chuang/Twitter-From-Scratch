import React, {useEffect} from 'react'
import { useHistory } from 'react-router';
import { fetchUser, fetchUserTimeline } from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../../firebase/config';
import { useParams } from 'react-router';

import Navigation from '../layout/Navigation';
import PrimaryColumn from '../PrimaryColumn/PrimaryColumn';
import Header from '../PrimaryColumn/Header';
import CreateTweet from '../PrimaryColumn/CreateTweet';
import Timeline from '../PrimaryColumn/Timeline';
import SecondaryColumn from '../SecondaryColumn/SecondaryColumn';
import Search from '../SecondaryColumn/Search';
import Activity from '../SecondaryColumn/Activity';
import FollowMenu from '../SecondaryColumn/FollowMenu';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box';



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'flex-start',
        '&::before, &::after': {
            content: '""',
            margin: 'auto',
        }
    },
}))

export default function Profile() {   
    const { handle } = useParams();

    const classes = useStyles()

    useEffect(()=> {

    }, [])    

    return (
        <Container className={classes.root}>
            <Navigation/>

            <PrimaryColumn>
                <Header title={handle}/>
            </PrimaryColumn>

            <SecondaryColumn>
                <Search/>
                <Activity/>
                <FollowMenu/>
            </SecondaryColumn>
        </Container>

        
    )
}
