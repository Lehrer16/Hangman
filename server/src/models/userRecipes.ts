import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/connection.js';

interface UserRecipeAttributes {
  id: number;
  username: string;
  recipeID: number;
}
interface UserRecipeCreationAttributes extends Optional<UserRecipeAttributes, 'id'> {}

export class UserRecipe extends Model <UserRecipeAttributes,UserRecipeCreationAttributes> implements UserRecipeAttributes {
  public id!: number;
  public username!: string;
  public recipeID!: number;
}
export function UserRecipeFactory(sequelize: Sequelize): typeof UserRecipe {
  UserRecipe.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize, 
    modelName: 'UserRecipe',
  })
  return UserRecipe};

