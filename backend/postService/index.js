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

mongoose
  .connect("mongodb://localhost:27017/expressmongo", {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

io.on("connection", (socket) => {
  socket.on("like", ({ id }) => {
    Post.findOne({ _id: id }).then((data) => {
      Post.findOneAndUpdate({ _id: id }, { likes: data.likes + 1 }).then(
        Post.findOne({ _id: id }).then((data) => {
          socket.emit("likes", data);
        })
      );
    });
  });
  socket.on("unlike", ({ id }) => {
    Post.findOne({ _id: id }).then((data) => {
      if (data.likes != 0) {
        Post.findOneAndUpdate({ _id: id }, { likes: data.likes - 1 }).then(
          Post.findOne({ _id: id }).then((data) => {
            socket.emit("unlikes", data);
          })
        );
      }
    });
  });
  socket.on("create-commentary", ({ postid, author, message }) => {
    User.findOne({ name: author }).then((data) => {
      if (data !== null) {
        const newCommentary = new Commentary({
          post_id: postid,
          author,
          message,
          avatar: data.avatar_link,
        });
        newCommentary.save().then(
          Commentary.find({ post_id: postid }).then((data) => {
            socket.emit("commentary", { data });
          })
        );
      }
    });
  });
  socket.on("get-commentary", ({ postid }) => {
    Commentary.find({ post_id: postid }).then((data) => {
      socket.emit("commentary", { data });
    });
  });
  socket.on("all_posts", () => {
    Post.find().then((data) => {
      socket.emit("all_posts", data);
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
});

server.listen(5003, () => {
  console.log("Run");
});
