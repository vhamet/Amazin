import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// create new instance of the mongoose.schema. the schema takes an
// object that shows the shape of your database entries.
const UserSchema = new Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });

// export our module to use in server.js
export default mongoose.model('User', UserSchema);
