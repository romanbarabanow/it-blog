const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const axios = require("axios");

const User = require("./mongo/User");

const app = express();
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors({ origin: "*" }));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

mongoose
  .connect("mongodb://localhost:27017/expressmongo", {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

io.on("connection", (socket) => {
  socket.on("all-users", () => {
    User.find().then((data) => {
      socket.emit("users", { data });
    });
  });
  socket.on("changeUser", ({ avatar_link, description, password, email }) => {
    User.findOneAndUpdate(
      { email: email },
      { avatar_link, description, password },
      { returnDocument: "after" }
    ).then((data) => {
      socket.emit("changeUsersData", {
        data,
      });
    });
  });
  socket.on("user-data", ({ email }) => {
    User.findOne({ email }).then((data) => {
      socket.emit("user-data", data);
    });
  });
});

app.post("/registration", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email }).then((isExist) => {
    if (isExist === null) {
      const newUser = new User({
        name,
        email,
        password,
      });
      newUser.save();
      axios.post(`http://localhost:5000/dir?name=${name}`);
      res.json({ message: "OK" });
    } else {
      res.json({ message: "FAIL" });
    }
  });
});

app.get("/users", (req, res) => {
  User.find().then((data) => {
    res.json(data);
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email, password }).then((data) => {
    if (data != null) {
      res.json(data);
    } else {
      res.json({ message: "FAIL" });
    }
  });
});

server.listen(5002, () => {
  console.log("Run");
});
