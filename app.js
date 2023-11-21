if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const port = 3000;
const cors = require("cors");
const express = require("express");
const app = express();
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//bikin END POINT/ROUTER
app.use(router);

//global
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
