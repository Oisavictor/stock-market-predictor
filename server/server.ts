import express, { Express, Request, Response } from "express";
import router from "./route/route";
const port = 5000;

const app: Express = express();
app.use(express.json());


app.use('/', router);



app.listen(port, () => {
  console.log(`app is been listen to on http://localhost:${port}`)
  }
)