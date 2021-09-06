import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import StickyBox from "react-sticky-box";
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    root : {
        width: "100%",
        backgroundColor: theme.palette.background.default,
        zIndex: theme.zIndex.appBar,
    },
    backButton: {
        marginRight: theme.spacing(2),
        padding: theme.spacing(1),
    }
}))

export default function Header({ title, divider=true, backButton=false }) {

    const classes = useStyles();
    const history = useHistory();

    return (
        <StickyBox className={classes.root}>
            <Box py={1} px={2} display="flex" alignItems="center">
                {backButton &&
                    <IconButton className={classes.backButton} onClick={history.goBack}>
                        <ArrowBackRoundedIcon fontSize="small"/>
                    </IconButton>
                }
                <Typography variant="h6">{title}</Typography>
            </Box>  
            {divider && <Divider/>}
        </StickyBox>
    )
}
