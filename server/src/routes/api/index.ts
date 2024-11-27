import { userRouter } from './user-routes.js';
import express from 'express';
import { cocktailRouter } from './cocktail-routes.js';
import { recipeRouter } from './recipe-routes.js';
import { userRecipeRouter } from './userRecipe-routes.js';
const router = express.Router();

router.use('/users', userRouter);
router.use('/recipes', recipeRouter)
router.use('/cocktails', cocktailRouter)
router.use('/userRecipe', userRecipeRouter )

export default router;
