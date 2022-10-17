const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path')
//middleware
app.use(express.json());
app.use(cors());

const fileRoute = require('./routes/file.route')

app.get("/", (req, res) => {
    res.send("Route is working! YaY!");
});

app.use("/", fileRoute)


module.exports = app;
