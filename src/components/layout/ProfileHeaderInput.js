import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Avatar from "./Avatar";
import IconButton from '@material-ui/core/IconButton';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import AddAPhotoRoundedIcon from '@material-ui/icons/AddAPhotoRounded';
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: 'relative',
    backgroundColor: theme.palette.grey[600],
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
    position: 'relative',
    borderRadius: '50%',
    alignSelf: 'flex-end',
    width: '25%',
    height: 'auto',
    minWidth: '48px',
    aspectRatio: '1/1',
    marginTop: '-16%',
    marginBottom: '-2px',
    marginLeft: theme.spacing(2),
    borderStyle: 'solid',
    borderWidth: '4px',
    borderColor: theme.palette.background.default,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: theme.palette.grey[600],
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
    padding: theme.spacing(1),
    color: '#fff',
    backgroundColor: 'rgba(15, 20, 25, 0.75)',
    '&:hover': {
      backgroundColor: 'rgba(39,44,48,.75)'
    }
  }
}));

export default function ProfileHeaderInput({profilePreview, headerPreview, handleProfileInputImage = null, handleHeaderInputImage, removeHeaderImage}) {

  const classes = useStyles();

  return (
      <Box width="100%">
        <Box className={classes.header} style={{backgroundImage: `url(${headerPreview})`}}>
          <Box width="100%" pb="33%"></Box>
          <Box className={classes.center}>
            <IconButton
              className={classes.iconButton}
              component="label"
            >
              <input type="file" onChange={handleHeaderInputImage} hidden/>
              <AddAPhotoRoundedIcon fontSize="small"/>
            </IconButton>
            {headerPreview && <IconButton
              className={classes.iconButton}
              onClick={removeHeaderImage}
            >
              <CloseRoundedIcon fontSize="small"/>
            </IconButton>}
          </Box>
        </Box>
        <Avatar className={classes.profilePicture} src={profilePreview}>
          {handleProfileInputImage && <Box className={classes.center}>
            <IconButton
              className={classes.iconButton}
              component="label"
            >
              <input type="file" onChange={handleProfileInputImage} hidden/>
              <AddAPhotoRoundedIcon fontSize="small"/>
            </IconButton>
          </Box>}
        </Avatar>
      </Box>
  );
}
