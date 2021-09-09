import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    minHeight: "100vh",
    maxWidth: "38rem",
  },
}));

export default function PrimaryColumn({ children, divider = true }) {
  const classes = useStyles();

  return (
    <>
      {divider && <Divider orientation="vertical" flexItem />}
      <div className={classes.root}>{children}</div>
      {divider && <Divider orientation="vertical" flexItem />}
    </>
  );
}
