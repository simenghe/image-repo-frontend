
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
import { UserContext } from "../context/UserProvider";
import { PublicImagesContext } from "../context/PublicImagesProvider";

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

export default function ImagePage() {
  const classes = useStyles();
  const [publicImages, setPublicImages] = useContext(PublicImagesContext);
  const { getIdToken, curUser } = useContext(UserContext);

  // Grab all public images
  useEffect(() => {
    async function fetchImageUrls() {
      try {
        const url = process.env.REACT_APP_SERVER_URL + "/images/getpublicurls";
        const resp = await axios.get(url);
        console.log(resp);
        if (resp.status === 200) {
          if (resp.data.length > 0) {
            setPublicImages(resp.data);
          }
          // setImageURLs(resp.data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchImageUrls();
  }, [setPublicImages, curUser, getIdToken]);

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
              Public Images
            </Typography>
            <div className={classes.heroButtons}></div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={3}>
            {publicImages.map((file) => (
              <Grid item key={file.id} xs={12} sm={6} md={4}>
                {/* <ImageCard id={file.id} url={file.signedUrl} date={file.date} /> */}
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={file.url}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {/* {file.id} */}
                    </Typography>
                    <Typography>
                      {`Uploaded : ${new Date(file.date).toLocaleDateString()}`}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button href={file.url} target="_blank" size="small" color="primary">
                      View
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
