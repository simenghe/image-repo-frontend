import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import ImageCard from './components/ImageCard';
import ImagePage from './components/ImagePage';
import LoginPage from './components/LoginPage';
import UploadPage from './components/UploadPage';
import CssBaseline from '@material-ui/core/CssBaseline';
import { UserContext, UserProvider } from './context/UserProvider';
import NavBar from './components/NavBar';
import SignOutPage from './components/SignoutPage';

function App() {

  return (
    <UserProvider>
      <Router>
        <CssBaseline />
        <NavBar />
        <div>
          <Switch>
            <Route path="/upload">
              <UploadPage />
            </Route>
            <Route path="/imagecard">
              <ImageCard />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/signout">
              <SignOutPage />
            </Route>
            <Route path="/">
              <ImagePage />
            </Route>
          </Switch>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
