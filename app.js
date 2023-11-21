// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }
// const cors = require("cors");
// const express = require("express");
// const app = express();
// const router = require("./routes");
// const errorHandler = require("./middlewares/errorHandler");
// const PORT = process.env.PORT;

// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// //bikin END POINT/ROUTER
// app.use(router);

// app.listen((_) => {
//   console.log(`app listening on port ${PORT}`);
// });

// //global
// app.use(errorHandler);

const cors = require("cors");
const router = require("./routes");
const express = require("express");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
