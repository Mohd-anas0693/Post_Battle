const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const router = require("./routes/index.routes");

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1", router);


module.exports = app;