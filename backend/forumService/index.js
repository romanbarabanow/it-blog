const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const axios = require("axios");

const ForumAnswer = require("./mongo/ForumAnswer");
const ForumQuestion = require("./mongo/ForumQuestion");
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
  socket.on("new_answer", ({ questionId, author, answer }) => {
    const newAnswer = new ForumAnswer({
      questionId,
      answer,
      author,
      avatar: data.avatar_link,
    });
    newAnswer.save();
    ForumAnswer.find({ questionId: questionId }).then((data) => {
      socket.emit("newAnswer", { data });
      ForumQuestion.findOne({ _id: questionId }).then((data) => {
        ForumQuestion.findOneAndUpdate(
          { _id: questionId },
          { answers: data.answers + 1 },
          { returnDocument: "after" }
        ).then((data) => console.log(data));
      });
    });
  });
  socket.on("answer", ({ id }) => {
    ForumAnswer.find({ questionId: id }).then((data) => {
      socket.emit("answer", data);
    });
  });
  socket.on("new_question", ({ author, question, body }) => {
    User.findOne({ name: author }).then((data) => {
      if (data != null) {
        const newQuestion = new ForumQuestion({
          author: data.name,
          avatar: data.avatar_link,
          question,
          body,
        });
        newQuestion.save();
        socket.emit("questionRespone", { message: "OK" });
      }
    });
  });
  socket.on("findQuestion", ({ id }) => {
    ForumQuestion.findOne({ _id: id }).then((data) => {
      socket.emit("question", data);
    });
  });
  socket.on("all_question", () => {
    ForumQuestion.find().then((data) => {
      socket.emit("all_question", data);
    });
  });
});

server.listen(5004, () => {
  console.log("Run");
});
