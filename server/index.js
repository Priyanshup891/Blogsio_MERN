const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/index");
const path = require("path");
const fileUpload = require('express-fileupload')
const cloudinary = require("cloudinary");

require("dotenv").config();
const app = express();

app.use("/images", express.static(path.join(__dirname, "./public/images")));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());

app.use("/api", routes);

const PORT = process.env.PORT || 8800;
const { MONGO_USERNAME, MONGO_PASSWORD } = process.env;

mongoose
  .connect(
    `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@ac-ifqeqqy-shard-00-00.b8f0zhl.mongodb.net:27017,ac-ifqeqqy-shard-00-01.b8f0zhl.mongodb.net:27017,ac-ifqeqqy-shard-00-02.b8f0zhl.mongodb.net:27017/?ssl=true&replicaSet=atlas-2xbx94-shard-0&authSource=admin&retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server is setup on ${PORT}`);
    })
  )
  .catch((err) => console.log(`Something is wrong with server: ${err}`));

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
