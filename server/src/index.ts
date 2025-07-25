import express, { Express, json, text } from "express";
import cors from "cors";
import WebSocket from "ws";

const port: number = 3000;
const app: Express = express();

const server = app.listen(port, () => {
  console.log(`Server Start ${Date.now()} on ${port}`);
});

const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());

const clients = new Map<string | null, WebSocket>();

wss.on("connection", (ws: WebSocket) => {
  let userId: string | null;
  ws.on("message", (data: WebSocket.RawData) => {
    try{

    
    const message = JSON.parse(data.toString());
    if (message.type === "register" && message.userId) {
      userId = message.userId;
      clients.set(userId, ws);
      console.log(`User ${userId} connectd`);
    }

    if (message.type === "send" && message.to && message.text) {
      const toUserSocket = clients.get(message.to);
      if (toUserSocket && toUserSocket.readyState === WebSocket.OPEN) {
        toUserSocket.send(
          JSON.stringify({
            from: userId,
            text: message.text,
          })
        );
      }
    }
  }
  catch(err){
    console.error("Error handig message", err)
  }
  });
  ws.send("Websocket Connected");
});
