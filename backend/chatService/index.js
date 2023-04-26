const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const axios = require("axios");

const Post = require("./mongo/Post");
const User = require("./mongo/User");
const RoomsForMessage = require("./mongo/RoomsForMessage");

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

const data = [
  { id: "a57566786786765d", message: "Привет", me: false },
  { id: "a575786786675ad", message: "Привет", me: true },
  { id: "a5677678686785675aaad", message: "Что делаешь?", me: false },
  { id: "aa75678768678678675vdfvdad", message: "Да ничего, отдыхаю", me: true },
  { id: "advdv4534645645dbd", message: "Понятненько", me: false },
  { id: "afvdvgr45345fad", message: "Пойдешь завтра гулять?", me: true },
  { id: "aad5dfsdfsdfsdf7576575vdfaad", message: "Почему бы и нет", me: false },
  { id: "a12adsfsdfsdad", message: "Тогда давай", me: true },
  { id: "a575534534534575adad", message: "Дела пойду делать", me: true },
];

mongoose
  .connect("mongodb://localhost:27017/expressmongo", {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

io.on("connection", (socket) => {
  socket.on("all_posts", () => {
    Post.find().then((data) => {
      socket.emit("all_posts", data);
    });
  });
  socket.on("all-users", () => {
    User.find().then((data) => {
      socket.emit("users", { data });
    });
  });
  socket.on("join", ({ id }) => {
    socket.join(id);
    socket.emit("messages", {
      data,
    });
  });
  socket.on("sendMessage", ({ id, message }) => {
    data.push({ id: Date.now(), message, me: true });
    socket.to(id).emit("message", data);
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
  socket.on("myPost", ({ email }) => {
    if (email) {
      Post.find({ name: email }).then((data) => {
        if (data.lenght !== 0) {
          socket.emit("post", { data });
        }
      });
    }
  });
  socket.on("create-post", ({ img_link, text, tittle, name }) => {
    const post = new Post({
      name,
      tittle,
      img_link,
      text,
    });
    post.save();
    Post.find({ name }).then((data) => {
      socket.emit("newPost", { data });
    });
  });
  socket.on("delete-post", ({ id, name }) => {
    Post.findOneAndDelete({ _id: id }).then((data) => {
      Post.find({ name }).then((data) => {
        socket.emit("newPost", { data });
      });
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
            axios.post("http://localhost:5000/create-dir", {
              data: {
                name: data.name,
              },
            });
            socket.emit("regData", {
              data,
            });
          });
        });
      }
    });
  });
  socket.on("my-dialogs", ({ myName }) => {
    RoomsForMessage.find({ myName }).then((datas) => {
      socket.emit("my-dialogs", { datas });
    });
  });
  socket.on("create-room", ({ creator, friendId }) => {
    User.findOne({ _id: friendId }).then((friend) => {
      if (friend != null) {
        RoomsForMessage.findOne({ myName: friend.name }).then((isExist) => {
          if (isExist === null) {
            RoomsForMessage.findOne({ myName: creator }).then((myExist) => {
              if (myExist === null) {
                const roomid = Date.now();
                const roomForFriend = new RoomsForMessage({
                  room_id: roomid,
                  name: creator,
                  myName: friend.name,
                });
                const myRoom = new RoomsForMessage({
                  room_id: roomid,
                  name: friend.name,
                  myName: creator,
                });
                roomForFriend.save();
                myRoom.save();
                RoomsForMessage.find({ myName: creator }).then((datas) => {
                  socket.emit("my-dialogs", { datas });
                });
              }
            });
          }
        });
      }
    });
  });
});

server.listen(5005, () => {
  console.log("Run");
});
