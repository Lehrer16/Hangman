import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { CocktailFactory } from './cocktail.js';
import { recipeFactory } from './recipes.js';
import { UserRecipeFactory } from './userRecipes.js';

const User = UserFactory(sequelize);
const Cocktail = CocktailFactory(sequelize);
const Recipe = recipeFactory(sequelize);
const UserRecipe = UserRecipeFactory(sequelize);

export { User, Cocktail, Recipe, UserRecipe };
