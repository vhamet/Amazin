import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TokenSchema = new mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    type: String,
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});

export default mongoose.model('Token', TokenSchema);
