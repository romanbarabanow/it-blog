const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const axios = require("axios");

const Post = require("./mongo/Post");
const User = require("./mongo/User");
const RoomsForMessage = require("./mongo/RoomsForMessage");
const Commentary = require("./mongo/Commentary");

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
                  socket.emit("newRoomData", { datas });
                });
              }
            });
          }
        });
      }
    });
  });
});

server.listen(5001, () => {
  console.log("Run");
});
