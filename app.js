if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const router = require("./routes");
const express = require("express");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
