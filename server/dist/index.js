"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = 3000;
const userIds = ["#121233", "#4556344", "#34354e5"];
app.post("/connect", (req, res) => {
    const { userId } = req.body;
    console.log(userId);
    try {
        for (let i of userIds) {
            if (i === userId) {
                res.json({
                    msg: "User exist",
                });
                return;
            }
            else {
                res.status(400).json({
                    msg: 'User not found'
                });
                break;
            }
        }
    }
    catch (_a) {
        res.json({
            error: "Something went wrong",
        });
    }
});
app.get("/", (req, res) => {
    res.send("Working...");
});
app.listen(port, () => {
    console.log(`Server Start ${Date.now()} on ${port}`);
});
