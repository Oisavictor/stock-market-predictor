import axios from 'axios'
export const stockMarketApi = async () => {
    const response = await axios.get(`${process.env.API_URL_Alpha_Vantage}&symbol=IBM&interval=5min&apikey=${process.env.API_KEY_Alpha_Vantage}`)
    const data = await response.data
    return data
   
}
 