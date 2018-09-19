import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  imgUrl: { type: String },
  category: { type: String },
  subcategory1: { type: String },
  subcategory2: { type: String },
}, { timestamps: true });

export default mongoose.model('Item', ItemSchema);
