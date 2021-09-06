import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider'
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box'
import ProfileHeaderInput from './ProfileHeaderInput';
import useStorage from '../../services/useStorage';
import TextField from '@material-ui/core/TextField';
import RoundButton from './RoundButton';
import { firestore, storage } from '../../firebase/config';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  modal: {
    overflowY:'auto',
  },
  content : {
    position: 'absolute',
    top: '5%',
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
    maxWidth: '32rem',
    width: '100%',
    backgroundColor: theme.palette.background.default,
    borderRadius: '1rem',
  },
  closeButton : {
    padding: theme.spacing(1),
  },
  inputs: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    padding: theme.spacing(2),
  }
}))

export default function EditProfileModal() { 
  
  const classes = useStyles();

  const {user} = useSelector(state => state.user)
  const [biography, setBiography] = useState(user.biography);
  const [name, setName] = useState(user.name);
  const [
    profilePreview,
    profileFile,
    handleProfileInputImage,
    uploadProfileImage,
    removeProfileImage,
  ] = useStorage(user.profilePictureURL);
  const [
    headerPreview,
    headerFile,
    handleHeaderInputImage,
    uploadHeaderImage,
    removeHeaderImage,
  ] = useStorage(user.headerImageURL);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleSubmit = async () => {
    const document = {};
    if (user.name !== name) document.name = name;
    if (user.biography !== biography) document.biography = biography;
    if (user.profilePictureURL !== profilePreview) document.profilePictureURL = await uploadProfileImage();
    if (user.headerImageURL !== headerPreview) document.headerImageURL = await uploadHeaderImage();
    firestore.collection('users').doc(user.username).update(document);
    handleClose();
  }

  return (
    <>
    <RoundButton variant="outlined" color="secondary" onClick={handleOpen}>Edit profile</RoundButton>

    <Modal
      open={open}
      onClose={handleClose}
      BackdropProps={{style: {backgroundColor: 'rgba(91, 112, 131, 0.4)'}}}
      className={classes.modal}
    >
      <div className={classes.content}>
        <Box p={1} display="flex" alignItems="center">
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <Box ml="auto">
            <RoundButton variant="contained" color="secondary" onClick={handleSubmit}>Save</RoundButton>
          </Box>
        </Box>
        <Divider/>
        <Box className={classes.inputs}>        
          <ProfileHeaderInput
                profilePreview={profilePreview}
                handleProfileInputImage={handleProfileInputImage}
                headerPreview={headerPreview}
                handleHeaderInputImage={handleHeaderInputImage}
                removeHeaderImage={removeHeaderImage}
          />
          <TextField
              className={classes.marginBottom}
              variant="outlined"
              fullWidth
              label="Name"
              type="text"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          <TextField
              variant="outlined"
              fullWidth
              label="Your bio"
              type="text"
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
              inputProps={{ maxLength: 150 }}
              autoFocus
              multiline
            />
        </Box>
      </div>
    </Modal>
    </>
  )
}
