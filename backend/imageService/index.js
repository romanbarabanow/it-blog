const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(fileUpload({}));
app.use(express.json());

app.post("/dir", (req, res) => {
  const { name } = req.query;
  fs.mkdir(`./files/${name}`, (error) => {
    if (error) {
      res.json({ message: "Already exist" }).status(400);
    } else {
      res.status(200).json({ message: "Success" });
    }
  });
});
app.post("/img", (req, res) => {
  const file = req.files.file;
  const { name } = req.query;
  const date = Date.now();
  const type = file.name.split(".").pop();
  const fileName = date + "-postImg." + type;
  const urlfile = `http://localhost:5000/file?name=${name}&filename=${fileName}`;
  file.mv(`./files/${name}/${fileName}`, file);
  res
    .json({
      urlfile,
    })
    .status(200);
});

app.get("/file", (req, res) => {
  const { name, filename } = req.query;
  fs.readFile(`./files/${name}/${filename}`, (err, data) => {
    if (err) {
      console.log(err);
      res.json({ message: "Some error" }).status(400);
    }
    res.send(data);
  });
});

app.listen(5000, () => {
  console.log("Running");
});
