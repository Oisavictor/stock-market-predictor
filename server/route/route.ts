//ROUTE
import express  from 'express';
import { landingPage, getStockPrice, predictStockPrice } from '../controller/StockPriceController';

const router = express.Router();

router.get('/:stockSymbol', getStockPrice);
router.post('/', predictStockPrice);
router.get("/", landingPage);

export default router;