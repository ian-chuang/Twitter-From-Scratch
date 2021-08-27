import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import CachedIcon from '@material-ui/icons/Cached';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    tweet: {
        display: 'flex',
        alignItems: 'flex-start',
        padding: theme.spacing(2,2),
        borderBottom: 'solid 1px',
        borderBottomColor: theme.palette.grey[800],
    },
    tweetInfo: {
        display: 'flex',
        gap: theme.spacing(.5),
        marginBottom: theme.spacing(1),
    },
    tweetButton: {
        marginLeft: 'auto',
    },
    iconButton: {
        padding: theme.spacing(1),
        marginRight: theme.spacing(1),
    }
}))

function timeDifference(timestamp) {

    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;

    let current = new Date();
    let elapsed = current - timestamp;

    console.log(current);
    console.log(timestamp);
    console.log(elapsed);

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + 's';   
    }
    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + 'm';   
    }
    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + 'h';   
    }
    else {
        return timestamp.toDateString();
    }
}

export default function Tweet({tweet}) {

    const classes = useStyles();

    const tweetOptions = [
        {text: 'Reply', icon: <ChatBubbleOutlineIcon/>, action: null},
        {text: 'Retweet', icon: <CachedIcon/>, action: null},
        {text: 'Like', icon: <FavoriteBorderIcon/>, action: null},
        {text: 'Share',icon: <ShareIcon/>, action: null},
    ]

    return (
        <>
            {tweet &&
            
                <div className={classes.tweet}>
                    <Avatar>I</Avatar>
                    <Box ml={2} width="100%">
                        <div className={classes.tweetInfo}>
                            <Typography variant="body2" color="textPrimary"><Box fontWeight="bold">Ian Chuang</Box></Typography>
                            {['@icheester', '·', timeDifference(tweet.timestamp.toDate())].map((info, i) => (
                                <Typography key={i} variant="body2" color="textSecondary">{info}</Typography>
                            ))}
                        </div>
                        
                        <Typography variant="body2" color="textPrimary">{tweet.message}</Typography>

                        <Box display="flex" alignItems="center" mt={1}>
                            { tweetOptions.map((option, i) => (
                                <Box width="100%" key={i}>
                                    <Button
                                        color="primary"
                                        startIcon={option.icon}
                                        aria-label={option.text}
                                        size="small"
                                    >
                                        {20}
                                    </Button>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </div>
            
            }
        </>
    )
}
