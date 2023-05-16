const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const axios = require("axios");

const User = require("./mongo/User");
const RoomsForMessage = require("./mongo/RoomsForMessage");
const Message = require("./mongo/Message");

const app = express();
app.use(express.json());

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
  .connect("mongodb://localhost:27017/expressmongo", {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

io.on("connection", (socket) => {
  socket.on("join", ({ id }) => {
    io.socketsJoin(id);
    socket.join(id);
  });
  socket.on("sendMessage", ({ id, message, author }) => {
    socket.emit("newData", {
      author,
      message,
      id,
    });
    const newMessage = new Message({
      author,
      message,
      roomId: id,
    });
    newMessage.save().then(() => {
      Message.find({ roomId: id });
    });
  });
  socket.on("my-dialogs", ({ myName }) => {
    RoomsForMessage.find({ myName }).then((datas) => {
      socket.emit("my-dialogs", { datas });
    });
  });
  socket.on(
    "create-room",
    ({ creator, friendName, avatar_link, my_avatar }) => {
      RoomsForMessage.findOne({ myName: creator, name: friendName }).then(
        (isExist) => {
          if (isExist === null) {
            RoomsForMessage.findOne({ myName: friendName, name: creator }).then(
              (myExist) => {
                if (myExist === null) {
                  const roomid = Date.now();
                  const roomForFriend = new RoomsForMessage({
                    room_id: roomid,
                    name: creator,
                    myName: friendName,
                    avatar_link: my_avatar,
                  });
                  const myRoom = new RoomsForMessage({
                    room_id: roomid,
                    name: friendName,
                    myName: creator,
                    avatar_link: avatar_link,
                  });
                  roomForFriend.save();
                  myRoom.save().then(() => {
                    RoomsForMessage.find({ myName: creator }).then((data) => {
                      socket.emit("newRoomData", data);
                    });
                  });
                }
              }
            );
          }
        }
      );
    }
  );
});

app.post("/messages", (req, res) => {
  const { roomId } = req.query;
  console.log(roomId);
  Message.find({ roomId: roomId }).then((data) => {
    res.json(data);
  });
});

server.listen(5001, () => {
  console.log("Run");
});
