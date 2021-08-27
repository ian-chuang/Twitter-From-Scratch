import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
   button : {
       borderRadius: '9999px',
       textTransform: 'none',
       fontWeight: 600,
   }
}))

export default function RoundButton({children, variant="contained", color="primary", className="", ...other}) {      

    const classes = useStyles()

    return (
        <Button className={clsx(classes.button, className)} color={color} variant={variant} {...other}>{children}</Button>
    )
}
