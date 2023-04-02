const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth.routes");
const cors = require("cors");
const User = require("./models/User");

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
    app.use("/api/auth", authRoute);
    app.get("/delete", async (req, res) => {
      await User.find().deleteMany();
    });
    app.listen(8080, () => {
      console.log("Running...");
    });
  } catch (e) {
    console.log(e);
  }
}

server();
