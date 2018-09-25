import mongoose from 'mongoose';

const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });

UserSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, match) => {
      if (err)
        reject(err);

      resolve(match);
    });
  });
};

UserSchema.methods.sessionUser = function sessionUser() {
  return { id: this._id, username: this.username, email: this.email };
};

export default mongoose.model('User', UserSchema);
