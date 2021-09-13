import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import RoundButton from './RoundButton';
import { firestore } from '../../firebase/config';
import firebase from 'firebase/app';
import { useSelector } from 'react-redux';
import { addActivity } from '../../services/firebase';

const useStyles = makeStyles((theme) => ({

}))

export default function FollowButton({user, ...rest}) { 
  
  const classes = useStyles();

  const {user: currentUser} = useSelector(state => state.user);
  const [toggleFollow, setToggledFollow] = useState(currentUser.following.includes(user.username));

  const handleClick = async () => {
    if (!toggleFollow) addActivity(currentUser.username, `${currentUser.name} followed ${user.name}.`);

    setToggledFollow(toggleFollow => !toggleFollow);

    await firestore.collection('users').doc(user.username).update({
      followers: toggleFollow ? firebase.firestore.FieldValue.arrayRemove(currentUser.username) :  firebase.firestore.FieldValue.arrayUnion(currentUser.username),
    })

    await firestore.collection('users').doc(currentUser.username).update({
      following: toggleFollow ? firebase.firestore.FieldValue.arrayRemove(user.username) :  firebase.firestore.FieldValue.arrayUnion(user.username),
    })
  }

  return (
    <>
      {toggleFollow ? <RoundButton variant="outlined" color="secondary" onClick={handleClick} {...rest}>Following</RoundButton>:  <RoundButton variant="contained" color="secondary" onClick={handleClick} {...rest}>Follow</RoundButton>
      }
    </>
  )
}
