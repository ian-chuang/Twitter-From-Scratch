import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        flexShrink: 1,
        padding: theme.spacing(2,2),
        gap: theme.spacing(2),
    }
}))

export default function SecondaryColumn({children}) {      

    const classes = useStyles()

    return (
        <Hidden smDown>
            <div className={classes.root}>
                {children}
            </div>
        </Hidden>
    )
}
