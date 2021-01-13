import React, { useContext, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { useEffect } from "react";
import axios from "axios";
import { ImagesContext } from "../context/ImagesProvider";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Checkbox from '@material-ui/core/Checkbox';
import { UserContext } from "../context/UserProvider";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link color="inherit" href="https://simenghe.github.io/"></Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

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

  checkBox: {
    marginBottom: theme.spacing(0.5),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
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
  },
}));

export default function MyImagePage() {
  const classes = useStyles();
  const [images, setImages] = useContext(ImagesContext);
  const { getIdToken, curUser } = useContext(UserContext);
  const [selected, setSelected] = useState({});

  async function handleRemove(id) {
    console.log(`Removing image ${id}`);
    const result = window.confirm(`Are you sure you want to remove image ${id}`);
    console.log(result);
    if (result) {
      setImages(prev => prev.filter(image => image.id !== id));
      const url = process.env.REACT_APP_SERVER_URL + "/images/delete/" + id;
      const config = {
        headers: {
          'Authorization': `token ${await getIdToken()}`,
          'UID': `${curUser.uid}`,
          'publicupload': false,
        }
      }
      const resp = await axios.delete(url, config);
      console.log(resp);
    }
  }

  async function handleBatchRemove() {
    const url = process.env.REACT_APP_SERVER_URL + "/images/removebatch";
    try {
      const toRemove = [];
      for (const key in selected) {
        if (selected[key] === true) {
          toRemove.push(key);
        }
      }
      console.log(`Removing images ${toRemove}`);
      const result = window.confirm(`Are you sure you want to remove image ${toRemove}`);
      if (result) {
        setImages(prev => (prev.filter(x => !selected[x.id])));
        console.log(`Removing ${toRemove}`);
        setSelected({});
        const body = {
          ids: toRemove
        }
        const config = {
          headers: {
            'Content-Type' : 'application/json',
            'Authorization': `token ${await getIdToken()}`,
            'UID': `${curUser.uid}`,
          }
        }
        console.log("Before URL");
        const resp = await axios.post(url, body, config);
        console.log(resp);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleChecked(e, id) {
    setSelected(prev => ({
      ...prev, [id]: e.target.checked,
    }));
    console.log(selected);
  }

  // Grab all public images
  useEffect(() => {
    async function fetchImageUrls() {
      try {
        const config = {
          headers: {
            'Authorization': `token ${await getIdToken()}`,
            'UID': `${curUser.uid}`,
            'publicupload': false,
          }
        }
        const url = process.env.REACT_APP_SERVER_URL + "/images/getuserurls";
        const resp = await axios.get(url, config);
        console.log(resp);
        if (resp.status === 200) {
          if (resp.data.length > 0) {
            setImages(resp.data);
          }
          // setImageURLs(resp.data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchImageUrls();
  }, [setImages, curUser.uid, getIdToken]);

  return (
    <React.Fragment>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Browse Your Images
              {Object.values(selected).some(x => x === true) ?
                <Button size="large" onClick={() => handleBatchRemove()} color="secondary">Remove</Button>
                :
                <Button disabled={true} size="large" color="secondary"></Button>
              }
            </Typography>
            <div className={classes.heroButtons}></div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={3}>
            {images.map((file) => (
              <Grid item key={file.id} xs={12} sm={6} md={4}>
                {/* <ImageCard id={file.id} url={file.signedUrl} date={file.date} /> */}
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={file.signedUrl}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {file.id}
                    </Typography>
                    <Typography>
                      {`Uploaded : ${new Date(file.date).toLocaleDateString()}`}
                    </Typography>
                  </CardContent>
                  <CardActions>
                  </CardActions>
                  <CardActions>
                    <Checkbox
                      onChange={(e) => handleChecked(e, file.id)}
                      className={classes.checkBox}
                      size="small"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    <Button size="large" href={file.signedUrl} target="_blank" color="primary">
                      View
                  </Button>
                    <Button onClick={() => handleRemove(file.id)} size="large" color="primary">
                      Remove
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Image Repo
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Shopify Developer Intern Challenge!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment >
  );
}
