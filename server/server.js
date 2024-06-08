const express = require("express");
const app = express();
const homepage = require("./routes/homepage.js");
const itemList = require("./routes/itemList.js");

app.use(express.json());

app.use(express.static("public"));

app.use((req, res, next) => {
  next();
});

app.use("/homepage", homepage);
app.use("/itemList", itemList);

app.listen(8080, () => {
  console.log("Server is working on http://localhost:8080");
});