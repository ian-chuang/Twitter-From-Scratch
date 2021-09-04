import React, {useEffect, useState} from 'react'
import { firestore } from '../../firebase/config';
import { useParams } from 'react-router';

import Navigation from '../layout/Navigation';
import PrimaryColumn from '../PrimaryColumn/PrimaryColumn';
import Header from '../PrimaryColumn/Header';
import Profile from '../PrimaryColumn/Profile';
import Timeline from '../PrimaryColumn/Timeline';
import SecondaryColumn from '../SecondaryColumn/SecondaryColumn';
import Search from '../SecondaryColumn/Search';
import Activity from '../SecondaryColumn/Activity';
import FollowMenu from '../SecondaryColumn/FollowMenu';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'



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

export default function ProfilePage() {   
    const { username } = useParams();
    const [user, setUser] = useState(null);

    const classes = useStyles()

    useEffect(()=> {
        const unsubscribe = firestore.collection('users')
        .doc(username)
        .onSnapshot(snapshot => {
            setUser({...snapshot.data(), username: username})
        })

        return () => unsubscribe();
    }, [])    

    return (
        <Container className={classes.root}>
            <Navigation/>

            <PrimaryColumn>
                {user && 
                    <>
                        <Header backButton={true} title={user.name}/>
                        <Profile user={user}/>
                    </>
                }  
            </PrimaryColumn>

            <SecondaryColumn>
                <Search/>
                <Activity/>
                <FollowMenu/>
            </SecondaryColumn>
        </Container>

        
    )
}
