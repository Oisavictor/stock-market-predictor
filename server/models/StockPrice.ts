//Model is using mongoose
import mongoose from 'mongoose';

const StockPriceSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: false
  },
  stockSymbol: {
    type: String,
    required: true,
    unique: true
  },
  predictedPrice: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
}
});

export default mongoose.model('StockPrice', StockPriceSchema);