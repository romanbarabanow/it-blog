const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoute = require("./routes/auth.routes");
const postRoute = require("./routes/posts.routes");
const commentaryRoute = require("./routes/commentary.routes");

const app = express();

function server() {
  try {
    mongoose
      .connect("mongodb://localhost:27017/expressmongo", {
        useNewUrlParser: true,
      })
      .then(() => console.log("MongoDB Connected"))
      .catch((err) => console.log(err));

    app.use(express.json());
    app.use(cors());

    app.use("/api", authRoute);
    app.use("/api", postRoute);
    app.use("/api", commentaryRoute);

    app.listen(8080, () => {
      console.log("Running...");
    });
  } catch (e) {
    console.log(e);
  }
}

server();
