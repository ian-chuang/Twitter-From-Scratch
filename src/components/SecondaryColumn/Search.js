import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 2),
    borderRadius: "9999px",
  },
}));

export default function Search({ children }) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <form>
        <TextField
          placeholder="Search Twitter..."
          type="text"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
        />
      </form>
    </Paper>
  );
}
