var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

var indexRouter = require("./routes/index");
var guruRouter = require("./routes/guru");
var materiRouter = require("./routes/materi");
var pesertaRouter = require("./routes/peserta");
var nilaiRouter = require("./routes/nilai");
var programRouter = require("./routes/program");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/api", indexRouter);
app.use("/api/data/guru", guruRouter(prisma));
app.use("/api/data/materi", materiRouter(prisma));
app.use("/api/data/peserta", pesertaRouter(prisma));
app.use("/api/data/nilai", nilaiRouter(prisma));
app.use("/api/data/program", programRouter(prisma));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
  });
});

module.exports = app;
