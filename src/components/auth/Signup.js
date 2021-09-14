import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, firestore } from "../../firebase/config";
import firebase from "firebase/app";
import Button from "../layout/RoundButton";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import TwitterIcon from "@material-ui/icons/Twitter";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import useStorage from "../../services/useStorage";
import ProfileInput from "../layout/ProfileInput";
import ProfileHeaderInput from "../layout/ProfileHeaderInput";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "32rem",
    margin: theme.spacing(4, "auto"),
  },
  content: {
    height: '30rem',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
  },
  primaryText: {
    fontSize: theme.typography.h5.fontSize,
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightBold,
    marginBottom: theme.spacing(3),
  },
  secondaryText: {
    fontSize: theme.typography.body2.fontSize,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(4),
  },
  marginBottom: {
    marginBottom: theme.spacing(3),
  },
  buttons: {
    display: 'flex',
    gap: theme.spacing(2),
  },
}));


export default function Signup() {
  const classes = useStyles();
  const history = useHistory();

  // user info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [biography, setBiography] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [
    profilePreview,
    profileFile,
    handleProfileInputImage,
    uploadProfileImage,
    removeProfileImage,
  ] = useStorage();
  const [
    headerPreview,
    headerFile,
    handleHeaderInputImage,
    uploadHeaderImage,
    removeHeaderImage,
  ] = useStorage();

  //stepper
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Create account', 'Set password', 'Add profile picture', 'Add header', 'Create bio', 'Set username'];

  const handleNext = async (e) => {
    e.preventDefault();
    
    const error = await stepErrorHandling(activeStep);
    if (error) {
      setError(error);
      return;
    }

    setError(null);

    if (activeStep + 1 < steps.length) {
      setActiveStep(activeStep + 1);
    }
    else {
      signup();
    }
    
  };

  const handleBack = () => {
    setError(null);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const signup = async () => {
      setError(null);
      setLoading(true);

      try {
          const {user} = await auth.createUserWithEmailAndPassword(email, password)
          
          await firestore.collection('uid')
          .doc(user.uid)
          .set({
            username : username,
          })

          const newUser = {
            name: name,
            email: email,
            following: [],
            followers: [],
            likes: [],
            retweets: [],
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            biography: biography,
            headerImageURL: await uploadHeaderImage(),
            profilePictureURL: await uploadProfileImage(),
          }

          await firestore.collection('users')
          .doc(username)
          .set(newUser)

          history.push('/home');
      }
      catch (error) {
          setError(error.message);
          setActiveStep(0);
      }
      finally {
          setLoading(false);
      }
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Box className={classes.primaryText}>
              Create your account
            </Box>
            {error && <Box width="100%" mb={2}><Alert severity="error">{error}</Alert></Box>}
            <TextField
              className={classes.marginBottom}
              variant="outlined"
              fullWidth
              label="Name"
              type="text"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </>
        );
      case 1:
        return (
          <>
            <Box
              className={classes.primaryText}
            >{`You’ll need a password`}</Box>
            <Box className={classes.secondaryText}>
              Make sure it's 6 characters or more.
            </Box>
            {error && <Box width="100%" mb={2}><Alert severity="error">{error}</Alert></Box>}
            <TextField
              variant="outlined"
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
          </>
        );
      case 2:
        return (
          <>
            <Box className={classes.primaryText}
            >
              Pick a profile picture
            </Box>
            <Box className={classes.secondaryText}>
                Have a favorite selfie? Upload it now.
            </Box>
            {error && <Box width="100%" mb={2}><Alert severity="error">{error}</Alert></Box>}
            <ProfileInput
              profilePreview={profilePreview}
              handleProfileInputImage={handleProfileInputImage}
              removeProfileImage={removeProfileImage}
            />
          </>
        );
      case 3:
        return (
          <>
            <Box className={classes.primaryText}>
              Pick a header
            </Box>
            <Box className={classes.secondaryText}>
                People who visit your profile will see it. Show your style.
            </Box>
            {error && <Box width="100%" mb={2}><Alert severity="error">{error}</Alert></Box>}
            <ProfileHeaderInput
              profilePreview={profilePreview}
              headerPreview={headerPreview}
              handleHeaderInputImage={handleHeaderInputImage}
              removeHeaderImage={removeHeaderImage}
            />
          </>
        );
      case 4:
        return (
          <>
            <Box className={classes.primaryText}>
              Describe yourself
            </Box>
            <Box className={classes.secondaryText}>
              What makes you special? Don't think too hard, just have fun with it.
            </Box>
            {error && <Box width="100%" mb={2}><Alert severity="error">{error}</Alert></Box>}
            <TextField
              variant="outlined"
              fullWidth
              label="Your bio"
              type="text"
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
              inputProps={{ maxLength: 150 }}
              autoFocus
              multiline
            />
          </>
        );
      case 5:
        return (
          <>
            <Box className={classes.primaryText}
            >
              What should we call you?
            </Box>
            <Box className={classes.secondaryText}>
              Your @username is unique.
            </Box>

            {error && <Box width="100%" mb={2}><Alert severity="error">{error}</Alert></Box>}
              
            <TextField
              variant="outlined"
              fullWidth
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
          </>
        );
      default:
        return "Unknown step";
    }
  }

  const stepErrorHandling = async (step) => {
    switch (step) {
      case 0:
        if (name.length === 0) return 'Name is required.'
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) return 'Invalid email address.';
        const query1 = await firestore.collection('users').where('email', '==', email).get()
        if (query1.docs.length !== 0) return 'Your email is already taken.'
        break;
      case 1:
        if (password.length <= 6) return 'Password must be greater than 6 characters.';
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        if (username.length === 0) return 'Username is required.';
        if (!/^\S*$/.test(username)) return 'No spaces are allowed in your username.'
        const query2 = await firestore.collection("users").doc(username).get()
        if (query2.exists) return 'Your username is already taken.';
        break;
      default:
        return null;
    }
  }

  return (
    <Container>
      <Box className={classes.root}>
        <form onSubmit={handleNext}>
          <Box mb={3}>
            <IconButton color="primary" onClick={() => history.push('/login')}>
              <TwitterIcon style={{ fontSize: 45 }} />
            </IconButton>
            
            <Box className={classes.content}>
              
              <Box flexGrow={1} my={4}>
                {getStepContent(activeStep)}
              </Box>

              <div className={classes.buttons}>
                {activeStep !== 0 && 
                    <Button size="large" onClick={handleBack} variant="contained" color="secondary" fullWidth>
                      Back
                    </Button>
                }
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  size="large"
                  type="submit"
                  fullWidth
                  disabled={loading}
                >
                  {activeStep === steps.length - 1 ? 'Sign up' : 'Next'}
                </Button>
              </div>
            </Box>
          </Box>
        </form>
      </Box>
      
    </Container>
  );
}
