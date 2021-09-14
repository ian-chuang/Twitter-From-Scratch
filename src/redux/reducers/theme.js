import { createTheme } from "@material-ui/core/styles";

const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "rgb(29, 161, 242)",
      contrastText: "#fff",
    },
    secondary: {
      main: "#fff",
      contrastText: "rgb(15, 20, 25)",
    },
    background: {
      default: "#000000",
      paper: "#15181c",
    },
    divider: "rgba(255,255,255,0.20)",
  },
  typography: {
    body2: {
      fontSize: ".925rem",
    },
  },
  shadows: ["none"],
});

const dimTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "rgb(29, 161, 242)",
      contrastText: "#fff",
    },
    secondary: {
      main: "#fff",
      contrastText: "rgb(15, 20, 25)",
    },
    background: {
      default: "rgb(21, 32, 43)",
      paper: "rgb(25, 39, 52)",
    },
    divider: "rgba(255,255,255,0.20)",
  },
  typography: {
    body2: {
      fontSize: ".925rem",
    },
  },
  shadows: ["none"],
});

const lightTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "rgb(29, 161, 242)",
      contrastText: "#fff",
    },
    secondary: {
      main: "rgb(15, 20, 25)",
      contrastText: "#fff",
    },
    background: {
      default: "#fff",
      paper: "rgb(247, 249, 249)",
    },
    text: {
      secondary: "rgba(0, 0, 0, 0.70)",
    },
    divider: "rgba(0,0,0,0.075)",
  },
  typography: {
    body2: {
      fontSize: ".925rem",
    },
  },
  shadows: ["none"],
});

const initialState = {
  type: "dark",
  theme: darkTheme,
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_THEME":
      if (state.type === "dark") return { type: "dim", theme: { ...dimTheme } };
      if (state.type === "dim")
        return { type: "light", theme: { ...lightTheme } };
      if (state.type === "light")
        return { type: "dark", theme: { ...darkTheme } };
      return state;
    default:
      return state;
  }
};

export default themeReducer;
