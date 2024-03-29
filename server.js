const express = require("express");
const cors = require("cors");
const connectDB = require("./dbinit");
const app = express();
require("dotenv").config();
const userRoute = require("./routes/userRoute");

connectDB();

const PORT = process.env.PORT || 8080;

//Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("Welcome to our API");
});

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
