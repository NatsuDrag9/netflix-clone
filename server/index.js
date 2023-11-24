const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successfull!"))
  .catch((err) => console.log(err));

// async function main() {
//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
//   await mongoose.connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("DB connection successfull!")
//   .catch((err) => console.log(err)));
// }

// Make express server accept json files
app.use(express.json());

// Post request made to the "/app/auth" end point
// belonging to authRoute
app.use("/api/auth", authRoute);

// CRUD operation requests made to "/api/users/{userId}"
// end point
app.use("/api/users", userRoute);

// CRUD operation requests made to "/api/movies" end point
app.use("/api/movies", movieRoute);

// CRUD operation requests made to "/api/lists" end point
app.use("/api/lists", listRoute);

// app.listen(8800, () => {
//   // Listens on the port 8800 on localhost
//   console.log("Backend server is running");
// });
