import express, { Express } from "express";
import cors from "cors";

const app: Express = express();
app.use(cors());
app.use(express.json());
const port: number = 3000;
const userIds: string[] = ["#121233", "#4556344", "#34354e5"];
app.post("/connect", (req, res) => {
  try {
    const { userId }: { userId: string } = req.body;
    console.log(userId);
    for (let i of userIds) {
      if (i === userId) {
        res.json({
          mag: "User exist",
        });
        return
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
