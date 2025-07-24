import express, { Express } from "express";
import cors from "cors";
import WebSocket from "ws";

const app:Express = express();
const server = 
const wss = new WebSocket.Server(app);
app.use(cors());
app.use(express.json());
const port: number = 3000;
const userIds: string[] = ["#121233", "#4556344", "#34354e5"];
app.post("/connect", (req, res) => {
  const { userId }: { userId: string } = req.body;
  console.log(userId);
  try {
    for (let i of userIds) {
      if (i === userId) {
        res.json({
          msg: "User exist",
        });
        return
      } 
      else{
        res.status(400).json({
          msg:'User not found'
        })
        break;
      }
    }
   
  } catch {
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
