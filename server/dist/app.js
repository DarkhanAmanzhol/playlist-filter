"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: path_1.default.join(__dirname, "..", ".env") });
const api_1 = __importDefault(require("./routes/api"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", api_1.default);
// Using a `public` folder as a starting point
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
app.get("/.*/", (req, res) => res.sendFile(path_1.default.join(__dirname, "..", "public", "index.html")));
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5000;
app.listen(PORT, () => {
    console.log(`Server is started in port ${PORT}`);
});
