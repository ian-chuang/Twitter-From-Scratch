import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
   button : {
       borderRadius: '9999px',
       textTransform: 'none',
       fontWeight: 600,
       minWidth: 'auto',
   }
}))

export default function RoundButton({children, className="", ...other}) {      

    const classes = useStyles()

    return (
        <Button className={clsx(classes.button, className)} {...other}>{children}</Button>
    )
}
