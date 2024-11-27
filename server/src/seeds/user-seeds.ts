import { User } from '../models/index.js';

export const seedUsers = async () => {
    await User.bulkCreate([
      { username: 'ibrew919', password: 'password' },
      { username: 'mutedatruth', password: 'password' },
      { username: 'generalB', password: 'password' },
    ], { individualHooks: true });
  };
  