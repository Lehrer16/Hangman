// import type { IBook } from '../models/Book.js';
// export default interface IUserDocument {
//   username: string | null;
//   email: string | null;
//   password: string | null;
//   savedBooks: IBook[];
//   isCorrectPassword(password: string): Promise<boolean>;
//   bookCount: number | null;
// }

import { Document } from 'mongoose';

interface IUser {
  username: string;
  email: string;
  password: string;
  savedBooks: string[];
  bookCount: number;
  isCorrectPassword(password: string): Promise<boolean>;
}

export default interface IUserDocument extends Document, IUser {}