import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import ImageCard from './components/ImageCard';
import ImagePage from './components/ImagePage';

function App() {
  return (
    <Router>
      <div>
        {/* <nav>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
        </nav> */}

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/imagecard">
            <ImageCard />
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
