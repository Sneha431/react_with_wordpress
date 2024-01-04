const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const app = express();
const connectDB = require("./database/connection");
dotenv.config();
const PORT = process.env.PORT;
connectDB();
app.use(express.json());
app.use(morgan("tiny"));
app.use("/", require("./routes/router.js"));
app.listen(PORT, () => {
  console.log(`Server is running port:${PORT}`);
});
