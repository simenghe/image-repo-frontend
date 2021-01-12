import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { UserContext } from '../context/UserProvider';

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
  const [publicUpload, setPublicUpload] = useState(false);
  const { getIdToken, curUser } = useContext(UserContext);

  async function handleCheckbox(e) {
    setPublicUpload(e.target.checked);
  }

  async function handlePublicUpload() {
    let url = process.env.REACT_APP_SERVER_URL + '/images/upload';
    try {
      const config = {
        'content-type': 'multipart/form-data',
        headers: {
          'Authorization': `token ${await getIdToken()}`,
          'UID': `${curUser.uid}`,
          'publicupload': publicUpload,
        }
      }
      const formData = new FormData();
      if (!files) {
        console.log("No Files!");
        return;
      }
      // if (files.length === 1) {
      //   formData.append('file', files[0]);
      //   console.log(formData);
      //   const resp = await axios.post(url, formData, config);
      //   console.log(resp);
      // }
      if (files.length > 0) {
        url = process.env.REACT_APP_SERVER_URL + '/images/uploadmultiple';
        for (let i = 0; i < files.length; i++) {
          formData.append('images', files[i]);
        }
        const resp = await axios.post(url, formData, config);
        console.log(resp);
        window.confirm("Success!")
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUpload(e) {
    await e.preventDefault();
    await handlePublicUpload();
    // const newUrl = process.env.REACT_APP_SERVER_URL + "/storage/testauth";
    // console.log(newUrl);
    // const config = {
    //   'content-type': 'multipart/form-data',
    //   headers: {
    //     'Authorization': `token ${await getIdToken()}`,
    //     'UID': `${curUser.uid}`,
    //     'publicupload': true,
    //   }
    // }
    // const resp = await axios.post(newUrl, curUser, config);
    // console.log(resp);
    // setFiles([]);
    // e.target.files = [];

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
              <FormControlLabel labelPlacement="bottom" className="checkboxtext" control={<Checkbox
                checked={publicUpload}
                onChange={handleCheckbox}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />} label="Public" />
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