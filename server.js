let express = require("express");
let mongoose = require("mongoose");
let request = require("request");
let querystring = require("querystring");
require("dotenv").config();
var svg2img = require("svg2img");
var fs = require("fs");
var cors = require("cors");
let app = express();
const User = require("./models/user.model");
app.use(cors());
app.use(express.json());

let bodyParser = require("body-parser");

// create application/json parser
let jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false });

let redirect_uri = process.env.REDIRECT_URI || "http://localhost:8888/callback";

const db =
  "mongodb+srv://CineDB:advance17@hymnsense.kb9ud.mongodb.net/hymnsense?retryWrites=true&w=majority";
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", (err) => {
  console.log("err", err);
});
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});

app.get("/login", function (req, res) {
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope:
          "user-top-read playlist-modify-public user-follow-modify user-read-currently-playing",
        redirect_uri,
      })
  );
});

app.get("/callback", function (req, res) {
  let code = req.query.code || null;
  let authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        new Buffer(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
    },
    json: true,
  };
  request.post(authOptions, function (error, response, body) {
    var access_token = body.access_token;
    let uri = process.env.FRONTEND_URI || "http://localhost:3000";
    res.redirect(uri + "?access_token=" + access_token);
  });
});

app.post("/onboard", async (req, res) => {
  try {
    const existingUser = await User.findOne({ spotify_id: req.body.id });
    if (existingUser) {
      return res.status(400).json({ msg: "Account already exists" });
    }
    console.log(req.body.name);

    const dummy = new User({
      name: req.body.name,
      spotify_id: req.body.id,
      top_artists: req.body.arr,
    });

    const saveuser = await dummy.save();
    res.status(200).json(dummy.name + "profile created.");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// app.post("/convert", async (req, res) => {
//   let svg = req.body;
//   console.log(svg);
//   // const png = await convert(svg);

//   res.set("Content-Type", "image/png");
//   res.send(png);
// });

// app.post("/api/convert", async (req, res) => {
//   var svgString = req.body;
//   console.log(svgString);
//   res.status(200);
//   // res.set('Content-Type', 'image/jpeg');
//   res.send("Success");
// });

let port = process.env.PORT || 8888;
console.log(
  `Listening on port ${port}. Go /login to initiate authentication flow.`
);
app.listen(port);

const path = require("path");
const { json } = require("express/lib/response");
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "client/build")));
// Anything that doesn't match the above, send back index.html
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/client/build/index.html"));
// });
