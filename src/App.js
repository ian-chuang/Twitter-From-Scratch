import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/pages/Home";
import ProfilePage from "./components/pages/ProfilePage";
import NotFound from "./components/pages/NotFound";
import PrivateRoute from "./components/helpers/PrivateRoute";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import {useSelector, useDispatch} from 'react-redux';
import { setUser, setFirebaseUser } from "./redux/actions";
import { firestore, auth } from "./firebase/config";

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
  }, [])

  useEffect (async () => {
    if (firebaseUser) {
      const username = await firestore.collection('uid')
      .doc(firebaseUser.uid).get()
      .then((snapshot) => snapshot.data().username)
      //get user info
      const userInfo = await firestore.collection('users')
      .doc(username).get().then((snapshot) => { return {...snapshot.data(), username : username}})
      // set user
      dispatch(setUser(userInfo));
    }
    else {
      dispatch(setUser(null))
    }
  }, [firebaseUser])

  return (
    <>
        <Router>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {!loading &&
              <Switch>
                <Route exact path="/"><Redirect to="/home" /></Route>
                <PrivateRoute path="/home" component={Home} />
                <PrivateRoute path="/profile/:username" component={ProfilePage} />
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