import React, {useState} from 'react'
import { auth } from '../../firebase/config';
import { useHistory } from 'react-router';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import RoundButton from './RoundButton';
import HomeIcon from '@material-ui/icons/Home';
import PublicIcon from '@material-ui/icons/Public';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TwitterIcon from '@material-ui/icons/Twitter';
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden'

const useStyles = makeStyles((theme) => ({
    list : {
        padding: theme.spacing(1, 2, 1 , 2),
        maxWidth: '15rem',
        flexGrow: 1,
    },
    tweetButton : {
        marginTop: theme.spacing(1),
        width: '100%',
    }
}))

export default function Navigation() {
    const classes = useStyles();
    const history = useHistory();

    const handleLogout = () => {
        auth.signOut()
        .then(() => history.push('/login'))
        .catch((err) => console.log(err))
    }

    const menuItems = [
        {text: 'Home', icon: <HomeIcon/>, onClick: ()=>history.push('/home')},
        {text: 'Explore', icon: <PublicIcon/>, onClick: ()=>history.push('/home')},
        {text: 'Profile', icon: <PersonIcon/>, onClick: ()=>history.push('/home')},
        {text: 'Settings',icon: <SettingsIcon/>, onClick: ()=>history.push('/home')},
        {text: 'Log out',icon: <ExitToAppIcon/>, onClick: handleLogout},
    ]

    return (
        <List className={classes.list}>
            <ListItem>
                <ListItemIcon><TwitterIcon style={{ fontSize: 27 }}/></ListItemIcon>
            </ListItem>
            {menuItems.map((item, index) => (
                <ListItem button key={index} onClick={item.onClick}>
                    <ListItemIcon>
                        {React.cloneElement(
                            item.icon,
                            {
                                style: {fontSize: 27}
                            }
                        )}
                    </ListItemIcon>
                    <Hidden mdDown>
                        <Typography variant="h6">{item.text}</Typography>
                    </Hidden>
                </ListItem>
            ))}
            <RoundButton className={classes.tweetButton} size="large">Tweet</RoundButton>
        </List>
    )
}
