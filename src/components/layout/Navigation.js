import React, { useState } from "react";
import { auth } from "../../firebase/config";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import RoundButton from "./RoundButton";
import HomeIcon from "@material-ui/icons/HomeRounded";
import PublicIcon from "@material-ui/icons/PublicRounded";
import PersonIcon from "@material-ui/icons/PersonRounded";
import SettingsIcon from "@material-ui/icons/SettingsRounded";
import ExitToAppIcon from "@material-ui/icons/ExitToAppRounded";
import TwitterIcon from "@material-ui/icons/Twitter";
import BrightnessLowIcon from "@material-ui/icons/BrightnessLowRounded";
import BrightnessMediumIcon from "@material-ui/icons/BrightnessMediumRounded";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHighRounded";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import CreateIcon from "@material-ui/icons/Create";
import CreateTweetModal from "./CreateTweetModal";
import StickyBox from "react-sticky-box";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 2, 2, 0),
    maxWidth: "16rem",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(0.5),
    [theme.breakpoints.up("lg")]: {
      flex: 1,
      alignItems: "flex-start",
    },
    [theme.breakpoints.down("md")]: {
      alignItems: "center",
    },
  },
  logo: {
    padding: theme.spacing(1.5),
  },
  navLink: {
    [theme.breakpoints.up("lg")]: {
      padding: theme.spacing(1.5, 2.5, 1.5, 1.5),
    },
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(1.5),
    },
  },
  navText: {
    marginLeft: theme.spacing(2),
  },
  tweetButtonLg: {
    marginTop: theme.spacing(3),
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    fontSize: 16,
    width: "100%",
  },
  tweetButtonSm: {
    marginTop: theme.spacing(1.5),
    padding: theme.spacing(1.5),
  },
}));

export default function Navigation() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const { type } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => history.push("/login"))
      .catch((err) => console.log(err));
  };

  let menuItems = [
    { text: "Home", icon: <HomeIcon />, onClick: () => history.push("/home") },
    {
      text: "Explore",
      icon: <PublicIcon />,
      onClick: () => history.push("/explore"),
    },
    {
      text: "Profile",
      icon: <PersonIcon />,
      onClick: () => history.push(`/profile/${user.username}`),
    },
    {
      text: "Settings",
      icon: <SettingsIcon />,
      onClick: () => history.push("/home"),
    },
    {
      text: "Toggle Theme",
      icon:
        type === "dark" ? (
          <BrightnessLowIcon />
        ) : type === "dim" ? (
          <BrightnessMediumIcon />
        ) : (
          <BrightnessHighIcon />
        ),
      onClick: () => dispatch(toggleTheme()),
    },
    { text: "Log out", icon: <ExitToAppIcon />, onClick: handleLogout },
  ];

  if (!user) menuItems = [menuItems[1], menuItems[4]];

  return (
    <>
      <StickyBox className={classes.root}>
        <RoundButton className={classes.logo} color="primary">
          <TwitterIcon style={{ fontSize: 32 }} />
        </RoundButton>
        {menuItems.map((item, i) => (
          <RoundButton
            key={i}
            onClick={item.onClick}
            className={classes.navLink}
          >
            {React.cloneElement(item.icon, {
              style: { fontSize: 32 },
            })}
            <Hidden mdDown>
              <Typography className={classes.navText} variant="h6">
                {item.text}
              </Typography>
            </Hidden>
          </RoundButton>
        ))}
        {user && (
          <>
            <Hidden mdDown>
              <RoundButton
                onClick={handleOpen}
                className={classes.tweetButtonLg}
                color="primary"
                variant="contained"
                size="large"
              >
                Tweet
              </RoundButton>
            </Hidden>
            <Hidden lgUp>
              <RoundButton
                onClick={handleOpen}
                className={classes.tweetButtonSm}
                color="primary"
                variant="contained"
              >
                <CreateIcon style={{ fontSize: 35 }} />
              </RoundButton>
            </Hidden>
          </>
        )}
      </StickyBox>

      {user && <CreateTweetModal handleClose={handleClose} open={open} />}
    </>
  );
}
