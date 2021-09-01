import { firestore, auth } from "../../firebase/config";

export const fetchUser = () => {
    return (dispatch) => {
        firestore.collection('users')
        .doc(auth.currentUser.uid)
        .get()
        .then((snapshot) => {
            if (snapshot.exists) {
                dispatch({type: 'USER_CHANGE', payload: snapshot.data()})
            }
            else {
                console.log('Cannot fetch user')
            }
        })
    }
}

export const fetchUserTimeline = () => {
    return (dispatch) => {
        firestore.collection('tweets')
        .where('parent', '==', null)
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => {
            const timeline = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return {id, ...data}
            })
            dispatch({type: 'USER_TIMELINE_CHANGE', payload: timeline})
        })
    }
}

export const toggleTheme = () => {
    return {
        type: 'TOGGLE_THEME'
    }
}
