const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

app.use(express.static(".")); // must place static files in a public folder otherwise lets access of app.js and index.js and others
const port = 3000;

app.all("*", (req, res) => {
  const filepath = path.join(__dirname, `${req.url}.html`);
  if (req.url === "/") {
    res.sendFile(path.join(__dirname, "index.html"));
  } else if (fs.existsSync(filepath)) {
    res.sendFile(filepath);
  } else {
    res.status(404).sendFile(path.join(__dirname, "404.html"));
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
