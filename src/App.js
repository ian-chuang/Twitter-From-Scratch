import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import PrivateRoute from "./components/helpers/PrivateRoute";
import { AuthProvider } from "./components/helpers/AuthContext";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import {useSelector} from 'react-redux';

function App() {

  const {theme} = useSelector(state => state.theme)

  return (
    <AuthProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/profile/:handle" component={Profile} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch> 
        </ThemeProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
