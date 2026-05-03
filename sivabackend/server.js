const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const orderRoutes = require("./routes/orderRoutes");
const contactRoutes = require("./routes/contactRoutes");

app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/sipserenity")
  .then(() => console.log("MongoDB Connected 🍃"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Sip Serenity Backend Running ☕");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

