import express from "express";
import "core-js";
const app = express();
const PORT = 4000;

const handleListening = () => {
  console.log(`Listening on : http://localhost:${PORT}`);
};

const handleHome = (req, res) => {
  res.send("Hello from home??");
};

const handleProfile = (req, res) => {
  res.send("This is Your Profile!");
};

app.get("/", handleHome);
app.get("/profile", handleProfile);

app.listen(PORT, handleListening);
