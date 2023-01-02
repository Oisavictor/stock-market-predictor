import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = 4400;

app.get('/', (req: Request, res: Response) => {
  res.send('stock_market_prediction');
});
app.listen(port, () => {
  console.log(`app is been listen to on ${port}`);
});
