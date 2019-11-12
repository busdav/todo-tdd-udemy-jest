const express = require("express");
const todoRoutes = require("./routes/todo.routes");
const app = express();
const mongodb = require("./mongodb/mongodb.connect");

mongodb.connect(); // Alternative would be `mongodb();` in case I had NOT put `connect` in object literals in the mognodb.connect module

app.use(express.json());
app.use("/todos", todoRoutes);

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});


app.get("/", (req, res) => {
  res.json("Hello world!");
});

module.exports = app;
