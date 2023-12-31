const express = require("express");
const app = express();
const cors = require("cors");
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

/* async function main() {
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successfull!")
  .catch((err) => console.log(err)));
} */

// Using express server
// Make express server accept json files
app.use(express.json());

// Define CORS options
const corsOptions = {
  origin: "https://natsudrag9.github.io",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

// Enabling CORS for all routes
app.use(cors(corsOptions));

// CSP
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; img-src 'self' https://netflix-clone-server-iota.vercel.app; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self' data:"
  );
  next();
});


/* API calls */
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

// Listening port on localhost
// app.listen(8800, () => {
//   // Listens on the port 8800 on localhost
//   console.log("Backend server is running");
// });

// Vercel dynamically assigns a port and sets the PORT environment variable
const PORT = process.env.PORT || 3001;
// const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
