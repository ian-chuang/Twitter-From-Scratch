import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './redux/reducers'
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/pages/Home';
import PrivateRoute from './components/helpers/PrivateRoute';
import { AuthProvider } from './components/helpers/AuthContext';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: 'rgb(29, 161, 242)',
      contrastText: '#fff',
    },
    secondary: {
      main: '#fff',
      contrastText: 'rgb(15, 20, 25)',
    },
    background: {
      default: '#000000',
      paper: '#15181c',
    },
    divider: 'rgba(255,255,255,0.20)'
  }
});

const store = createStore(rootReducer, applyMiddleware(thunk))

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Provider store={store}>
              <Switch>
                <PrivateRoute path='/home' component={Home}/>
                <Route path='/login' component={Login}/>
                <Route path='/signup' component={Signup}/>
              </Switch>
          </Provider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
