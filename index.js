const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const dotenv = require("dotenv");
const postRoute = require("./routes/posts");

const router = express.Router();
const path = require("path");
const cors = require("cors");
const bodyParser = require('body-parser');

// middlewares
app.use(express.json());
 app.use(bodyParser.urlencoded({extended:false}));
dotenv.config();
db =
  "mongodb+srv://pavankumarmoka:3ccG3rpxQoWOGEJl@expresscluster.gfleory.mongodb.net/mydb?retryWrites=true&w=majority";
mongoose.connect(
  db,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("Connected to MongoDB");
  }
);
app.use("/img", express.static(path.join(__dirname, "public/img")));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors("https://fantastic-dasik-c57510.netlify.app/home"));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use("/api/posts", postRoute);

app.listen(8800, () => {
  console.log("Backend server is running!");
});
