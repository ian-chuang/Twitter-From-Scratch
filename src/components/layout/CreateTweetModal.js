import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider'
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box'
import CreateTweet from '../PrimaryColumn/CreateTweet';

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
    maxWidth: '38rem',
    width: '100%',
    backgroundColor: theme.palette.background.default,
    borderRadius: '1rem',
  },
  closeButton : {
    padding: theme.spacing(1),
  }
}))

export default function CreateTweetModal({handleClose, open}) { 

  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      BackdropProps={{style: {backgroundColor: 'rgba(91, 112, 131, 0.4)'}}}
      className={classes.modal}
    >
      <div className={classes.content}>
        <Box p={1}>
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider/>
        <CreateTweet divider={false} minRows={5} onSend={handleClose}/>
      </div>
    </Modal>

  )
}
