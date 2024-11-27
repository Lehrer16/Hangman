import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/connection.js';

interface UserAttributes {
  id: number;
  username: string;
  password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string; 
  public password!: string; 
}

export function UserFactory(sequelize: Sequelize): typeof User {
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize, 
    modelName: 'User',
    tableName: 'Users',
    timestamps: true,
  });
  
  return User;
};
