import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import StickyBox from "react-sticky-box";

const useStyles = makeStyles((theme) => ({
    header : {
        padding: theme.spacing(1, 2),
    },
    root : {
        width: "100%",
        backgroundColor: theme.palette.background.default,
        zIndex: theme.zIndex.appBar,
    }
}))

export default function Header({ title, divider=true }) {

    const classes = useStyles();

    return (
        <StickyBox className={classes.root}>
            <Typography className={classes.header} variant="h6">{title}</Typography>
            {divider && <Divider/>}
        </StickyBox>
    )
}
