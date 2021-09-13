import React from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme) => ({
  profilePicture: {
    minHeight: theme.spacing(6),
    minWidth: theme.spacing(6),
    borderRadius: '50%',
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
}));

export default function Avatar({src, children, className, ...rest}) {
  const classes = useStyles();
  return (
    <Box {...rest} className={clsx(classes.profilePicture, className)} style={{backgroundImage: `url(${src ? src : '/profile_picture.png'})`}}>
      {children}
    </Box>
  )
}
