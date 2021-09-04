import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { auth, firestore } from "../../firebase/config";
import firebase from "firebase/app";
import RoundButton from "../layout/RoundButton";
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import TwitterIcon from '@material-ui/icons/Twitter';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from "react-redux";
import { changeLoading, changeUser } from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: "100vh",
    },
    image: {
      backgroundImage: "url(/auth_image.png)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(2),
    },
    imageLogo: {
      width: '100%',
      height: '60%',
      maxWidth: '25rem',
      fill: '#fff'
    },
    authGrid : {
      display: 'flex',
      alignItems: 'center',
    },
    auth: {
      margin: theme.spacing(4, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      width: '100%',
      maxWidth: '32rem',
    },
    form: {
      width: "100%", // Fix IE 11 issue.
    },
    submit: {
      margin: theme.spacing(2, 0),
      paddingTop: theme.spacing(1.5),
      paddingBottom: theme.spacing(1.5),
      fontSize: 18,
    },
    links : {
      gap: theme.spacing(.5),
      display: 'flex',
      justifyContent: 'center',
    },
    footer : {
      padding: theme.spacing(2),
      display: 'flex',
      gap: theme.spacing(2),
      flexWrap: 'wrap',
      justifyContent: 'center',
    }
  }));

export default function Signup() {
    const emailRef = useRef();
    const nameRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    function ScalableTwitterIcon() {
        return (
          <svg className={classes.imageLogo} width="100%" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"></path></svg>
        );
      }
    
      function Copyright() {
        return (
          <Typography variant="body2" color="textSecondary">
            {"Copyright © Ian Chuang "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        );
      }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const name = nameRef.current.value;
        const username = usernameRef.current.value;
        setError(null);
        setLoading(true);

        try {
            dispatch(changeLoading(true))

            //Check unique username
            await firestore.collection("users")
            .doc(username)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    throw {message: `Your username is not available.`};
                }
            })

            const {user} = await auth.createUserWithEmailAndPassword(email, password)
            
            await firestore.collection('uid')
            .doc(user.uid)
            .set({
              username : username,
            })

            const newUser = {
              name: name,
              email: email,
              followingCount: 0,
              followersCount: 0,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              biography: null,
              headerImageURL: null,
              profilePictureURL: null,
            }

            await firestore.collection('users')
            .doc(username)
            .set(newUser)

            console.log(newUser);
            dispatch(changeUser(newUser));

            history.push('/home');
        }
        catch (error) {
            setError(error.message)
            passwordRef.current.value = "";
            emailRef.current.value = "";
            nameRef.current.value = "";
            usernameRef.current.value = "";
        }
        finally {
            setLoading(false);
        }
    }

    return (
    <>
    
      <Grid container component="main" className={classes.root}>
        <Hidden xsDown>
          <Grid item sm={4} md={6} lg={7} className={classes.image}>
            <ScalableTwitterIcon />
          </Grid>
        </Hidden>
          
        <Grid item xs={12} sm={8} md={6} lg={5} className={classes.authGrid}>
          <div className={classes.auth}>
            <TwitterIcon style={{fontSize: 45}} color="primary"/>
            <Box fontWeight="fontWeightBold" mt={3} fontSize="h4.fontSize">Create your account</Box>
            {error && <Box width="100%" my={2}><Alert severity="error">{error}</Alert></Box>}
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              
              <TextField
                inputRef={nameRef}
                variant="outlined"
                margin="normal"
                fullWidth
                label="Name"
                type="text"
                autoFocus
              />
              <TextField
                inputRef={usernameRef}
                variant="outlined"
                margin="normal"
                fullWidth
                label="Username"
                type="text"
                autoFocus
              />
              <TextField
                inputRef={emailRef}
                variant="outlined"
                margin="normal"
                fullWidth
                label="Email Address"
                type="email"
                autoFocus
              />
              <TextField
                inputRef={passwordRef}
                variant="outlined"
                margin="normal"
                fullWidth
                label="Password"
                type="password"
              />

              <RoundButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                className={classes.submit}
                disabled={loading}
              >
                Sign up
              </RoundButton>

              <div className={classes.links}>
                <Typography variant="body1">
                    Already have an account?{' '}
                    <Link variant="body1" onClick={() => {history.push('/login')}}>
                        Sign in
                    </Link>
                </Typography>
              </div>

              <Box mt={3} textAlign="center">
                <Copyright/>
              </Box>
              
                
            </form>
          </div>
        </Grid>
      </Grid>
      <div className={classes.footer}>
        {['About',
          'Help Center',
          'Terms of Service',
          'Privacy Policy',
          'Cookie Policy',
          'Ads info',
          'Blog',
          'Status',
          'Careers',
          'Brand Resources',
          'Advertising',
          'Marketing',
          'Twitter for Business',
          'Developers',
          'Directory',
          'Settings'].map((text, i) => (
            <Link variant="body2" color="textSecondary" key={i}>{text}</Link>
          ))}
      </div>
    </>
    )
}
