import React, {useEffect, useState} from 'react'
import { firestore } from '../../firebase/config';

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

import { useSelector } from 'react-redux';
import LargeFollowMenu from '../PrimaryColumn/LargeFollowMenu';



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

export default function Connect() {   

    const classes = useStyles()

    return (
        <Container className={classes.root}>
            <Navigation/>

            <PrimaryColumn>
                <Header title="Connect" backButton={true}/>
                <LargeFollowMenu/>
            </PrimaryColumn>

            <SecondaryColumn>
                <Search/>
                <Activity/>
            </SecondaryColumn>
        </Container>

        
    )
}
