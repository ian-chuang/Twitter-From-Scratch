import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import StickyBox from "react-sticky-box";
import Copyright from "../layout/Copyright";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    maxWidth: "24rem",
    minWidth: "20rem",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2, 0, 2, 2),
    gap: theme.spacing(2),
  },
}));

export default function SecondaryColumn({ children, copyright=true }) {
  const classes = useStyles();

  return (
    <Hidden smDown>
      <StickyBox className={classes.root}>
        {children}
        {copyright && <Copyright textAlign="center"/>}
      </StickyBox>
    </Hidden>
  );
}
