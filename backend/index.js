const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const connectdb = require("./config/database");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const profileRoutes = require("./routes/profileRoutes");
const productRoute = require("./routes/Product");
const payment = require("./routes/Payment");
const contactRoute = require("./routes/contact");
const fileUpload = require("express-fileupload");
const cloudinary = require("./config/FileUpload");
require("dotenv").config();

connectdb();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

cloudinary.cloudinaryConnect();
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1", userRoute);
app.use("/api/v1", profileRoutes);
app.use("/api/v1", productRoute);
app.use("/api/v1", payment);
app.use("/api/v1", contactRoute);

app.listen(PORT, () => {
  console.log(`Server listening in  localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send(`<h1>This is Home Page</h1>`);
});
