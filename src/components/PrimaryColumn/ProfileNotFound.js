import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Divider from '@material-ui/core/Divider'


const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.grey[600],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    gap: theme.spacing(2),
  },
  pictureContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
    gap: theme.spacing(1),
  },
  profilePicture: {
    alignSelf: 'flex-end',
    width: '25%',
    height: 'auto',
    minWidth: '48px',
    aspectRatio: '1/1',
    marginTop: '-16%',
    marginBottom: '-2px',
    borderStyle: 'solid',
    borderWidth: '4px',
    borderColor: theme.palette.background.default,
  },
  notFound : {
    width: 'auto',
    marginTop: theme.spacing(8),
    alignSelf: 'center',
  }
}));

export default function ProfileNotFound({username}) {
  const classes = useStyles();  

  return (
    <>

          <Box width="100%">
            <Box className={classes.header}><Box width="100%" pb="33%"></Box></Box>
            <Box className={classes.content}>
              <Box>
                <Box className={classes.pictureContainer}>
                  <Avatar className={classes.profilePicture}/>
                </Box>
                <Box fontWeight="fontWeightBold" fontSize="h6.fontSize">{`@${username}`}</Box>
              </Box>
              <Box className={classes.notFound}>
                <Box fontWeight="fontWeightBold" fontSize="h4.fontSize">{`This account doesn’t exist`}</Box>
                <Typography color="textSecondary" variant="body2">{`Try searching for another.`}</Typography>
              </Box>
            </Box>
          </Box>

    </>
  );
}
