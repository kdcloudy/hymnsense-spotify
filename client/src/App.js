import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  useLocation,
} from "react-router-dom";
import Landing from "./pages/Landing";
import TopSongs from "./pages/TopSongs";
import TopArtists from "./pages/TopArtists";
import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/topSongs" exact component={TopSongs} />
        <Route path="/topArtists" exact component={TopArtists} />
      </Switch>
    </Router>
  );
};

export default App;
