import axios from "axios";
export const stockMarketApi = async () => {
  const response = await axios.get(
    `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval&symbol=IBM&interval=5min&apikey=${process.env.API_KEY_Alpha_Vantage}`
  );
  const data = await response.data;
  return data;
};

export const GoogleStockApi = async () => {
  const response = await axios.get(
    `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2023-01-09?adjusted=true&apiKey=${process.env.Google_Stock_API_KEYS}`
  );
  const data = await response.data;
  return data;
};

export const DataSetApi = async () => {
  const response = await axios.get(
    `https://stockmarket222.iex.cloud/v1/data/stockmarket222/DATASET_IUPJF7ZB5?last=100&token=${process.env.DATA_SET_API_TOKEN}`
  );
  const data = await response.data;
  return data;
};
//Get Trade From All NSE
export const YahooFinanceApi = async () => {
 const options = {
  method: 'GET',
  url: 'https://yahoo-finance15.p.rapidapi.com/api/v1/sec/form4',
  headers: {
    'X-RapidAPI-Key': '3b8b473390msh31ca8d22aef0b0bp172dc7jsnb219b36c0462',
    'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
  }
};

const response = await axios.request(options)
	return response.data
};

//News From All NSE

export const YahooFinanceApiNews = async () => {
  const options = {
   method: 'GET',
   url: 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne/news',
   headers: {
     'X-RapidAPI-Key': '3b8b473390msh31ca8d22aef0b0bp172dc7jsnb219b36c0462',
     'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
   }
 };
 
 const response = await axios.request(options)
   return response.data
 };
 
 //Get Stock by Symbol

 export const YahooFinanceSymbol = async (symbol: any) => {
  const options = {
   method: 'GET',
   url: `https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne/news/${symbol}`,
   headers: {
     'X-RapidAPI-Key': '3b8b473390msh31ca8d22aef0b0bp172dc7jsnb219b36c0462',
     'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
   }
 };
 console.log(options.url)
 const response = await axios.request(options)
   return response.data
 };


//Get multiple stock by symbol
export const YahooMultiple = async (symbol: any) => {
  const options = {
   method: 'GET',
   url: `https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/AAPL,MSFT`,
   headers: {
     'X-RapidAPI-Key': '3b8b473390msh31ca8d22aef0b0bp172dc7jsnb219b36c0462',
     'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
   }
 };

 const response = await axios.request(options)
   return response.data
 };
