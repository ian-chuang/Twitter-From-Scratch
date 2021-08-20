import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Container} from '@material-ui/core';

import { AuthProvider } from './contexts/AuthContext';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/pages/Home';
import PrivateRoute from './components/helpers/PrivateRoute';

function App() {
  return (
    <Container>
      <Router>
        <AuthProvider>
          <Switch>
            <Route path='/login' component={Login}/>
            <Route path='/signup' component={Signup}/>
            <PrivateRoute path='/home' component={Home}/>
          </Switch>
        </AuthProvider>
      </Router>
    </Container>
  );
}

export default App;
