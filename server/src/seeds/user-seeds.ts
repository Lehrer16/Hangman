// import { User } from '../models/index.js';

// export const seedUsers = async () => {
//     await User.bulkCreate([
//       { username: 'ibrew919', password: 'password' },
//       { username: 'mutedatruth', password: 'password' },
//       { username: 'generalB', password: 'password' },
//     ], { individualHooks: true });
//   };

import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

export const User = model<IUser>('User', userSchema);

  