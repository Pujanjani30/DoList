import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import bcyptjs from 'bcryptjs';

const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 20
  },
  user_email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  user_password: {
    type: String,
    required: true
  },
  user_role: {
    type: String,
    required: true,
    enum: ['user', 'admin'],
    default: 'user'
  },
  user_isLoggedIn: {
    type: Boolean,
    default: false
  },
  // user_refreshToken: {
  //   type: String,
  //   default: null
  // },
}, { timestamps: true })

userSchema.pre("save", async function (next) {
  if (!this.isModified("user_password")) return next();
  this.user_password = await bcyptjs.hash(this.user_password, 10);
  next();
})

userSchema.methods.verifyPassword = async function (password) {
  return await bcyptjs.compare(password, this.user_password);
}

userSchema.methods.generateAccessToken = async function () {
  return jwt.sign({
    user_id: this._id,
    user_name: this.user_name,
    user_email: this.user_email
  },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
}

// userSchema.methods.generateRefreshToken = async function () {
//   return jwt.sign({
//     user_id: this._id
//   },
//     process.env.REFRESH_TOKEN_SECRET,
//     { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
// }

export default mongoose.model('User', userSchema);