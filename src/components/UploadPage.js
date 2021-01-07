import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { useState } from 'react';
import { SentimentSatisfied } from '@material-ui/icons';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));



export default function Checkout() {
  const classes = useStyles();
  const [files, setFiles] = useState([]);

  async function handleUpload(e) {
    e.preventDefault();
    const url = process.env.REACT_APP_SERVER_URL + '/images/upload';
    console.log(url);
    try {
      if (files.length > 0) {
        const formData = new FormData();
        formData.append('file', files[0]);
        const config = {
          'content-type': 'multipart/form-data'
        }
        const resp = await axios.post(url, formData, config);
        console.log(resp);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function onChange(e) {
    console.log(e.target.files);
    setFiles(e.target.files);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Toolbar>
      </Toolbar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Upload Images Here
            <form onSubmit={handleUpload}>
              <input type="file" name="file" onChange={onChange} accept="image/*" multiple />
              <br />
              <button>Upload</button>
            </form>
          </Typography>
          <React.Fragment>
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}