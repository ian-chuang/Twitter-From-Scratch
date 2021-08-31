import React, {useState} from 'react'
import { auth } from '../../firebase/config';
import { useHistory } from 'react-router';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import RoundButton from './RoundButton';
import HomeIcon from '@material-ui/icons/Home';
import PublicIcon from '@material-ui/icons/Public';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TwitterIcon from '@material-ui/icons/Twitter';
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden'
import CreateIcon from '@material-ui/icons/Create';
import CreateTweetModal from './CreateTweetModal';

const useStyles = makeStyles((theme) => ({

    root : {
        padding: theme.spacing(1, 2, 1, 0),
        maxWidth: '15rem',
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(.5),
        [theme.breakpoints.up('lg')] : {
            flexGrow: 1,
            alignItems: 'flex-start',
        },
        [theme.breakpoints.down('md')] : {
            alignItems: 'center',
        }  
    },
    logo: {
        padding: theme.spacing(1.5),
    },
    navLink: {
        [theme.breakpoints.up('lg')] : {
            padding: theme.spacing(1.5, 2.5, 1.5, 1.5),
        },
        [theme.breakpoints.down('md')] : {
            padding: theme.spacing(1.5),
        }  
    },
    navText: {
        marginLeft: theme.spacing(2),
    },
    tweetButtonLg : {
        marginTop: theme.spacing(3),
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
        fontSize: 16,
        width: '100%',
    },
    tweetButtonSm : {
        marginTop: theme.spacing(1.5),
        padding: theme.spacing(1.5),
    }
}))

export default function Navigation() {
    const classes = useStyles();
    const history = useHistory();

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
        <>
            <div className={classes.root}>
                
                <RoundButton className={classes.logo}><TwitterIcon style={{ fontSize: 32 }}/></RoundButton>
                {menuItems.map((item, i) => (
                    <RoundButton key={i} onClick={item.onClick} className={classes.navLink}>
                        {React.cloneElement(
                            item.icon,
                            {
                                style: {fontSize: 32}
                            }
                        )}
                        <Hidden mdDown>
                            <Typography className={classes.navText} variant="h6">{item.text}</Typography>
                        </Hidden>
                    </RoundButton>
                ))}
                <Hidden mdDown>
                    <RoundButton onClick={handleOpen} className={classes.tweetButtonLg} color="primary" variant="contained" size="large">Tweet</RoundButton>
                </Hidden>
                <Hidden lgUp>
                    <RoundButton onClick={handleOpen} className={classes.tweetButtonSm} color="primary" variant="contained"><CreateIcon style={{ fontSize: 35 }}/></RoundButton>
                </Hidden>
                
            </div>

            <CreateTweetModal handleClose={handleClose} open={open}/>
        </>
    )
}
