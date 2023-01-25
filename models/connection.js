const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://and29:uk7P6aqsySYtdXx8@cluster0.vkcy2.mongodb.net/tickethack";

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected"))
  .catch((error) => console.error(error));
