import React from 'react'
import { useHistory } from 'react-router';
import Navigation from '../layout/Navigation';
import RoundButton from '../layout/RoundButton';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import { Typography } from '@material-ui/core';



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

export default function NotFound() {   
  const classes = useStyles()
  const history = useHistory()

  return (
      <Container className={classes.root}>
          <Navigation/>

          <Box flexGrow={1} mt={8} textAlign="center">
            <Box mb={4}><Typography variant="body2" color="textSecondary">{`Hmm...this page doesn’t exist.`}</Typography></Box>
            <RoundButton color="primary" variant="contained" onClick={history.goBack}>Go back</RoundButton>
          </Box>
      </Container>

        
  )
}
