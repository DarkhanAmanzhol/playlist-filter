const express = require("express");
const path = require("path");
const api = require("./routes/api");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const app = express();
app.use(express.json());
app.use("/api", api);

const PORT = process.env.PORT | 5000;

app.listen(PORT, () => {
  console.log(`Server is started in port ${PORT}`);
});
