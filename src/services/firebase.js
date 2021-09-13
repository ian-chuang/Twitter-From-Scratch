import { firestore } from "../firebase/config";
import firebase from 'firebase/app';

export function fetchHomeTimeline(user, setTimeline) {
  let unsubscribe = () => {};
  if (user.following.length > 0) {
      unsubscribe = firestore
      .collection('tweets')
      .where('parent', '==', null)
      .where('username', 'in', [user.username , ...user.following])
      .orderBy('timestamp', 'desc')
      .onSnapshot(result => {
          const tweets = result.docs.map((doc) => {
              const data = doc.data();
              const id = doc.id;

              return {id, ...data}
          });

          setTimeline(tweets);
      })
  }
  else {
    setTimeline([])
  }

  return () => unsubscribe();
}

export function fetchUserTimeline(username, setTimeline) {
  const unsubscribe = firestore.collection('tweets')
  .where('username', '==', username)
  .where('parent', '==', null)
  .orderBy('timestamp', 'desc')
  .onSnapshot(snapshot => {
      setTimeline(snapshot.docs.map(doc => {
          const data = doc.data();
          const id = doc.id;
          return {id, ...data}
      }))
  })
  return () => unsubscribe();
}

export function fetchUserSnapshot(username, setUser) {
  const unsubscribe = firestore.collection('users')
  .doc(username)
  .onSnapshot(snapshot => {
      if (snapshot.exists) {
          setUser({...snapshot.data(), username: username})
      }
      else {
          setUser(undefined);
      }     
  })
  return () => unsubscribe();
}

export function fetchUser(username) {
  return firestore
  .collection("users")
  .doc(username)
  .get()
  .then((snapshot) => {
    if (snapshot.exists) {
      return { ...snapshot.data(), username: username };
    }
  });
}

export function fetchPeopleToFollow(user) {
  return firestore.collection('users')
  .where(firebase.firestore.FieldPath.documentId(), 'not-in', [user.username , ...user.following])
  .get()
  .then((result) => {
      return result.docs.map((doc) => {
          const username = doc.id;
          const data = doc.data();
          return {...data, username: username}
      });
  })
}

export function fetchPeopleToFollowLimit(user) {
  return firestore.collection('users')
  .where(firebase.firestore.FieldPath.documentId(), 'not-in', [user.username , ...user.following])
  .limit(2)
  .get()
  .then((result) => {
      return result.docs.map((doc) => {
          const username = doc.id;
          const data = doc.data();
          return {...data, username: username}
      });
  })
}

export function fetchActivity(setActivity) {
  const unsubscribe = firestore.collection('activity')
  .orderBy('timestamp', 'desc')
  .onSnapshot(async snapshot => {
    setActivity(await Promise.all(snapshot.docs.map( async doc => {
      const data = doc.data();
      const user = await firestore.collection('users').doc(data.username).get().then(result => result.data());
      return {profilePictureURL: user?.profilePictureURL, ...data}
    })));
  })
  return () => unsubscribe();
}

export function fetchActivityLimit(setActivity) {
  const unsubscribe = firestore.collection('activity')
  .orderBy('timestamp', 'desc')
  .limit(4)
  .onSnapshot(async snapshot => {
    setActivity(await Promise.all(snapshot.docs.map( async doc => {
      const data = doc.data();
      const user = await firestore.collection('users').doc(data.username).get().then(result => result.data());
      return {profilePictureURL: user?.profilePictureURL, ...data}
    })));
  })
  return () => unsubscribe();
}

export function addActivity(username, message) {
  firestore.collection('activity').add({
    username: username,
    message: message,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  })
}