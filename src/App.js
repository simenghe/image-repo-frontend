import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import ImageCard from './components/ImageCard';
import ImagePage from './components/ImagePage';
import LoginPage from './components/LoginPage';
import UploadPage from './components/UploadPage';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  title: {
    flexGrow: 1,
  }
}));

function App() {
  const classes = useStyles();

  return (
    <Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>

          <Link className="link" to="/" color="inherit">
            <Button color="inherit"><CameraIcon edge="start" className={classes.icon} /></Button>
          </Link>
          <Typography className={classes.title} variant="h6" color="inherit" >
            Image Repository
          </Typography>
          <Link className="link" to="/upload" color="inherit">
            <Button color="inherit">Upload</Button>
          </Link>
          <Link className="link" to="/login" color="inherit">
            <Button color="inherit">Login</Button>
          </Link>
        </Toolbar>
      </AppBar>
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
          <Route path="/">
            <ImagePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
