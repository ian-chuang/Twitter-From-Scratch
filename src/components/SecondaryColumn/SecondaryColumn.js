import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: '22rem',
        minWidth: '18rem',
        display: 'flex',
        flexDirection: 'column',
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
