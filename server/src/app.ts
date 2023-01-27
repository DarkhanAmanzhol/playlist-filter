import express, { Request, Response } from "express";
import path from "path";
import { config } from "dotenv";

config({ path: path.join(__dirname, "..", ".env") });

import api from "./routes/api";
const app = express();

app.use(express.json());
app.use("/api", api);

// Using a `public` folder as a starting point
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/.*/", (req: Request, res: Response) =>
  res.sendFile(path.join(__dirname, "..", "public", "index.html"))
);

const PORT = process.env.PORT ?? 5000;

app.listen(PORT, () => {
  console.log(`Server is started in port ${PORT}`);
});
