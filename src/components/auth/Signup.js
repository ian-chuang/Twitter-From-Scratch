import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, firestore } from "../../firebase/config";
import firebase from "firebase/app";
import RoundButton from "../layout/RoundButton";
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TwitterIcon from '@material-ui/icons/Twitter';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from "react-redux";
import useStorage from '../../services/useStorage';
import ProfileInput from "../layout/ProfileInput";
import ProfileHeaderInput from "../layout/ProfileHeaderInput";
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: '32rem',
      margin: theme.spacing(4, 'auto')
    },
  }));

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [biography, setBiography] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [profilePreview, profileFile, handleProfileInputImage, uploadProfileImage, removeProfileImage] = useStorage();
    const [headerPreview, headerFile, handleHeaderInputImage, uploadHeaderImage, removeHeaderImage] = useStorage();

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    /*
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null);
        setLoading(true);

        try {

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

            dispatch(changeUser({...newUser, username: username}));

            history.push('/home');
        }
        catch (error) {
            setError(error.message)
        }
        finally {
            setLoading(false);
        }
    }
    */

    return (
      <Container>
        <Box className={classes.root}>
          <Box mb={3}><TwitterIcon style={{fontSize: 45}} color="primary"/></Box>
          <Box fontWeight="fontWeightBold" fontSize="h5.fontSize">Create your account</Box>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Name"
            type="text"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Box fontWeight="fontWeightBold" mt={3} fontSize="h5.fontSize">{`You’ll need a password`}</Box>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Box fontWeight="fontWeightBold" mt={3} mb={1} fontSize="h5.fontSize">Pick a profile picture</Box>
          <Box mb={3}><Typography color="textSecondary" variant="body2">Have a favorite selfie? Upload it now.</Typography></Box>
          <ProfileInput profilePreview={profilePreview} handleProfileInputImage={handleProfileInputImage} removeProfileImage={removeProfileImage}/>

          <Box fontWeight="fontWeightBold" mt={3} mb={1} fontSize="h5.fontSize">Pick a header</Box>
          <Box mb={3}><Typography color="textSecondary" variant="body2">People who visit your profile will see it. Show your style.</Typography></Box>
          <ProfileHeaderInput profilePreview={profilePreview} headerPreview={headerPreview} handleHeaderInputImage={handleHeaderInputImage} removeHeaderImage={removeHeaderImage}/>


          <Box fontWeight="fontWeightBold" mt={3} mb={1} fontSize="h5.fontSize">Describe yourself</Box>
          <Typography color="textSecondary" variant="body2">What makes you special? Don't think too hard, just have fun with it.</Typography>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Your bio"
            type="text"
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            inputProps={{ maxLength: 150 }}
            autoFocus
            multiline
          />



          <Box fontWeight="fontWeightBold" mt={3} mb={1} fontSize="h5.fontSize">What should we call you?</Box>
          <Typography color="textSecondary" variant="body2">Your @username is unique.</Typography>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>
      </Container>
    )
}
