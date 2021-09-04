import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import RoundButton from "../layout/RoundButton";
import Divider from '@material-ui/core/Divider'
import TodayIcon from '@material-ui/icons/Today';
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.grey[600],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    gap: theme.spacing(2),
  },
  pictureContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
    gap: theme.spacing(1),
  },
  profilePicture: {
    alignSelf: 'flex-end',
    width: '25%',
    height: 'auto',
    minWidth: '48px',
    aspectRatio: '1/1',
    marginTop: '-16%',
    marginBottom: '-2px',
    borderStyle: 'solid',
    borderWidth: '4px',
    borderColor: theme.palette.background.default,
  },
  date: {
    verticalAlign: 'text-bottom',
    fontSize: 18,
  },
  bio :{
    whiteSpace: 'pre-line',
    width: '100%',
  }
}));

export default function Profile({user}) {
  const classes = useStyles();

  const {user:currentUser} = useSelector(state => state.user);

  const temp = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;

  const headerImageURL = user.headerImageURL ? `url(${user.headerImageURL})` : null;

  let dateJoined = ` Joined `;
  if (user.createdAt) {
    const createdAt = user.createdAt.toDate();
    dateJoined = ` Joined ${createdAt.toLocaleString('default', { month: 'long' })} ${createdAt.getFullYear()}`
  }
    

  return (
    <>
      {user && 
        <>
          <Box width="100%">
            <Box className={classes.header} style={{backgroundImage: headerImageURL}}><Box width="100%" pb="33%"></Box></Box>
            <Box className={classes.content}>
              <Box>
                <Box className={classes.pictureContainer}>
                  <Avatar className={classes.profilePicture} src={user.profilePictureURL}/>
                  {currentUser.username === user.username && <RoundButton variant="outlined" color="secondary">Edit profile</RoundButton>}
                </Box>
                <Box fontWeight="fontWeightBold" fontSize="h6.fontSize">{user.name}</Box>
                <Typography color="textSecondary" variant="body2">{`@${user.username}`}</Typography>
              </Box>
              {user.biography && <Typography variant="body2" className={classes.bio}>{user.biography}</Typography>}
              <Typography color="textSecondary" variant="body2"><TodayIcon className={classes.date}/>{dateJoined}</Typography>
              <Box display="flex">
                <Box fontWeight="fontWeightBold" fontSize="body2.fontSize" mr={2}>{user.followingCount} {' '}<Typography color="textSecondary" variant="body2" component="span">Following</Typography></Box>
                <Box fontWeight="fontWeightBold" fontSize="body2.fontSize">{user.followersCount} {' '}<Typography color="textSecondary" variant="body2" component="span">Followers</Typography></Box>
              </Box>
            </Box>
          </Box>
          <Divider/>
        </> 
      }
    </>
  );
}
