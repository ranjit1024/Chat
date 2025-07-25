"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const ws_1 = __importDefault(require("ws"));
const port = 3000;
const app = (0, express_1.default)();
const server = app.listen(port, () => {
    console.log(`Server Start ${Date.now()} on ${port}`);
});
const wss = new ws_1.default.Server({ server });
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const clients = new Map();
wss.on("connection", (ws) => {
    let userId;
    ws.on("message", (data) => {
        try {
            const message = JSON.parse(data.toString());
            if (message.type === "register" && message.userId) {
                userId = message.userId;
                clients.set(userId, ws);
                console.log(`User ${userId} connectd`);
            }
            if (message.type === "send" && message.to && message.text) {
                const toUserSocket = clients.get(message.to);
                if (toUserSocket && toUserSocket.readyState === ws_1.default.OPEN) {
                    toUserSocket.send(JSON.stringify({
                        from: userId,
                        text: message.text,
                    }));
                }
            }
        }
        catch (err) {
            console.error("Error handig message", err);
        }
    });
    ws.send("Websocket Connected");
});
