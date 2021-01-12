import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ImageCard from "./components/ImageCard";
import ImagePage from "./components/ImagePage";
import LoginPage from "./components/LoginPage";
import UploadPage from "./components/UploadPage";
import CssBaseline from "@material-ui/core/CssBaseline";
import { UserProvider } from "./context/UserProvider";
import NavBar from "./components/NavBar";
import SignOutPage from "./components/SignoutPage";
import MyImagePage from "./components/MyImagePage";
import PrivateRoute from "./utils/PrivateRoute";
import { ImagesProvider } from "./context/ImagesProvider";
import { PublicImagesProvider } from "./context/PublicImagesProvider";
function App() {
  return (
    <Router>
      <UserProvider>
        <PublicImagesProvider>
          <ImagesProvider>
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
                <PrivateRoute
                  path="/signout"
                  component={SignOutPage}
                ></PrivateRoute>
                <PrivateRoute
                  path="/myimages"
                  component={MyImagePage}
                ></PrivateRoute>
                <Route path="/">
                  <ImagePage />
                </Route>
              </Switch>
            </div>
          </ImagesProvider>
        </PublicImagesProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
