import React from 'react'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'

export default function Copyright(props) {
  return (
    <Box {...props}>
      <Typography variant="body2" color="textSecondary">
        {"Copyright © Ian Chuang "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>  
  );
}
