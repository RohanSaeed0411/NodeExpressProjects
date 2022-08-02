require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const router = require("./routes/products");

//middleware
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("<h1>Store API</h1><a href='/api/v1/products'>show products</a>");
});

app.use("/api/v1/products", router);

//product routes
app.use(notFoundMiddleware);
app.use(errorMiddleware);

//db
const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(3000, () => {
      console.log("Server is listening to the port " + port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
