const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const ForumAnswer = require("./mongo/ForumAnswer");
const ForumQuestion = require("./mongo/ForumQuestion");

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
  socket.on("new_answer", ({ questionId, author, answer, avatar_link }) => {
    const newAnswer = new ForumAnswer({
      questionId,
      answer,
      author,
      avatar: avatar_link,
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
  socket.on("new_question", ({ author, question, body, avatar_link }) => {
    // const newQuestion = new ForumQuestion({
    //   author: author,
    //   avatar: avatar_link,
    //   question,
    //   body,
    // });
    // newQuestion.save();
    socket.emit("questionRespone", { message: "OK" });
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
