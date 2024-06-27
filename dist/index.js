"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const members_1 = __importDefault(require("./routes/members"));
const errorHandler_1 = __importDefault(require("./utils/errorHandler"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api', members_1.default);
app.use(errorHandler_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
