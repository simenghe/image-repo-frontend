import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import ImageCard from './components/ImageCard';
import ImagePage from './components/ImagePage';
import LoginPage from './components/LoginPage';
import UploadPage from './components/UploadPage';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/upload">
            <UploadPage/>
          </Route>
          <Route path="/imagecard">
            <ImageCard />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/">
            <ImagePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
