import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from '@material-ui/core/IconButton';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import AddAPhotoRoundedIcon from '@material-ui/icons/AddAPhotoRounded';
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  profilePicture: {
    maxWidth: '15rem',
    width: '100%',
    borderRadius: '50%',
    height: 'auto',
    minWidth: '5rem',
    aspectRatio: '1/1',
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: 'relative',
    margin: theme.spacing(0, 'auto'),
  },
  center : {
    position: 'absolute',
    top: '50%', 
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    gap: theme.spacing(1),
  },
  iconButton: {
    color: '#fff',
    backgroundColor: 'rgba(15, 20, 25, 0.75)',
    '&:hover': {
      backgroundColor: 'rgba(39,44,48,.75)'
    }
  }
}));

export default function ProfileInput({profilePreview, handleProfileInputImage, removeProfileImage}) {

  const classes = useStyles();

  return (
    <Box className={classes.profilePicture} style={{backgroundImage: `url(${profilePreview ? profilePreview : '/profile_picture.png'})`}}>
      <Box className={classes.center}>
        <IconButton
          className={classes.iconButton}
          component="label"
        >
          <input type="file" onChange={handleProfileInputImage} hidden/>
          <AddAPhotoRoundedIcon/>
        </IconButton>
        {profilePreview && <IconButton
          className={classes.iconButton}
          onClick={removeProfileImage}
        >
          <CloseRoundedIcon/>
        </IconButton>}
      </Box>
    </Box>
  );
}
