const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const axios = require("axios");

const User = require("./mongo/User");

const app = express();
const mongoose = require("mongoose");
app.use(cors({ origin: "*" }));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

mongoose
  .connect("mongodb://mongodb:27017/expressmongo", {
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
  socket.on("loginWithData", ({ email, password }) => {
    User.findOne({ email: email, password: password }).then((data) => {
      if (data != null) {
        socket.emit("token", { user: data });
      }
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
  socket.on("login", ({ email }) => {
    if (email) {
      User.findOne({ email: email }).then((data) => {
        if (data === null) {
          socket.emit("data for login", {
            message: "Fail",
          });
        }
        socket.emit("data for login", {
          data,
        });
      });
    }
    socket.emit("data for login", {
      message: "Fail",
    });
  });
  socket.on("registration", ({ name, login, password }) => {
    User.findOne({ email: login, name }).then((data) => {
      if (data === null) {
        const newUser = new User({
          email: login,
          name,
          password,
        });
        newUser.save().then(() => {
          User.findOne({ email: login }).then((data) => {
            axios.post(`http://image-service:5000/dir?name=${data.name}`);
            socket.emit("regData", {
              data,
            });
          });
        });
      }
    });
  });
});

server.listen(5002, () => {
  console.log("Run");
});
