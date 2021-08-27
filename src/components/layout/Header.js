import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme) => ({
    header : {
        padding: theme.spacing(1, 2),
        borderBottom: 'solid 1px',
        borderBottomColor: theme.palette.grey[800],
        width: "100%",
    },
}))

export default function Header({ title }) {

    const classes = useStyles();

    return (
        <Typography className={classes.header} variant="h6">{title}</Typography>
    )
}
