import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        minHeight: '100vh',
        maxWidth: '38rem',
        borderRight: '1px solid',
        borderRightColor: theme.palette.grey[800],
        borderLeft: '1px solid',
        borderLeftColor: theme.palette.grey[800],
    }
}))

export default function PrimaryColumn({children}) {      

    const classes = useStyles()

    return (
        <div className={classes.root}>
            {children}
        </div>
    )
}
