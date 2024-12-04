// import { Schema, model, type Document } from 'mongoose';
import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import IUserDocument from '../interfaces/UserDocument';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isCorrectPassword(password: string): Promise<boolean>;
}

// const userSchema = new Schema<IUser>(
//   {
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       match: [/.+@.+\..+/, 'Must use a valid email address'],
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//   },
//   // set this to use virtual below
//   {
//     toJSON: {
//       virtuals: true,
//     },
//   }
// );

const userSchema: Schema<IUserDocument> = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedBooks: { type: [String], required: true }, // Match this to the IUser interface
  bookCount: { type: Number, required: true }, // Match this to the IUser interface
});

const User = mongoose.model<IUserDocument>('User', userSchema);

export { User };

// hash user password
userSchema.pre<IUser>('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

// const User = model<IUser>('User', userSchema);

export default User;
