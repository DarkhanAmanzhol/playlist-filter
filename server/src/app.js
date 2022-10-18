const express = require("express");
const path = require("path");
const api = require("./routes/api");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const app = express();
app.use(express.json());
app.use("/api", api);

// Using a `public` folder as a starting point
console.log(path.join(__dirname, "..", "public"));
app.use(express.static(path.join(__dirname, "..", "public")));
app.get("/.*/", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public", "index.html"))
);

const PORT = process.env.PORT | 5000;

app.listen(PORT, () => {
  console.log(`Server is started in port ${PORT}`);
});
