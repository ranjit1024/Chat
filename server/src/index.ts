import express, { Express } from "express";
import cors from "cors"
import WebSocket from "ws";

const port: number = 3000;
const app:Express = express();

const server = app.listen(port, () => {
  console.log(`Server Start ${Date.now()} on ${port}`);
});

const wss = new WebSocket.Server({server});

app.use(cors());
app.use(express.json());

const clients = new Map<string, WebSocket>();
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

wss.on('connection', (socket, req)=>{
  let userId: string | null = null;
  socket.on('message', (data: WebSocket.RawData)=>{
    try{
      const message = JSON.parse(data.toString());
   
      if(message.type === 'send' &&  message.to && message.text){
        const toUserSocket = clients.get(message.to);
        if(toUserSocket && toUserSocket.readyState === WebSocket.OPEN){
          toUserSocket.send(
            JSON.stringify({
              from:userId,
              text:message.text
            })
          )
        }
      }
      
    }
    catch(err){
      console.log(err);

    }
  })
  
  socket.send("Connected")
})