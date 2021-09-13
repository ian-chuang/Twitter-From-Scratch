import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/pages/Home";
import Explore from "./components/pages/Explore";
import ProfilePage from "./components/pages/ProfilePage";
import TweetPage from "./components/pages/TweetPage";
import NotFound from "./components/pages/NotFound";
import PrivateRoute from "./components/helpers/PrivateRoute";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import {useSelector, useDispatch} from 'react-redux';
import { setUser, setFirebaseUser } from "./redux/actions";
import { firestore, auth } from "./firebase/config";
import Connect from "./components/pages/Connect";
import ActivityPage from "./components/pages/ActivityPage";
import Settings from "./components/pages/Settings";

function App() {

  const {theme} = useSelector(state => state.theme);
  const {firebaseUser} = useSelector(state=> state.user);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect (() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      dispatch(setFirebaseUser(user));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch])

  useEffect (async () => {
    let unsubscribe = () => {}
    if (firebaseUser) {
      try{
        const username = await firestore.collection('uid')
        .doc(firebaseUser.uid).get()
        .then((snapshot) => snapshot.data().username)
        //get user info
        unsubscribe = firestore.collection('users')
        .doc(username).onSnapshot((snapshot) => { 
          const userInfo = {...snapshot.data(), username : username}
          dispatch(setUser(userInfo));
        })
      }
      catch {
        dispatch(setUser(undefined));
      }
    }
    return () => unsubscribe();
  }, [firebaseUser, dispatch])

  return (
    <>
        <Router>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {!loading &&
              <Switch>
                <Route exact path="/"><Redirect to="/home" /></Route>
                <PrivateRoute path="/home" component={Home} />
                <PrivateRoute path="/explore" component={Explore} />
                <PrivateRoute path="/profile/:username" component={ProfilePage} />
                <PrivateRoute path="/settings" component={Settings} />
                <PrivateRoute path="/connect" component={Connect}/>
                <PrivateRoute path="/activity" component={ActivityPage}/>
                <PrivateRoute path="/tweet/:tweetid" component={TweetPage} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="*" component={NotFound}/>
              </Switch> 
            }
          </ThemeProvider>
        </Router>
    </>
  );
}

export default App;