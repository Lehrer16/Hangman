import express, { Request, Response } from 'express';
import { UserRecipe } from '../../models/userRecipes.js';

const router = express.Router();

interface SaveRecipeRequestBody {
    username: string; 
    recipeID: number;
}

router.post('/', async (req: Request<{}, {}, SaveRecipeRequestBody>, res: Response) => {
    const { username, recipeID } = req.body;  

    try {
   
        const userRecipe = await UserRecipe.create({ username, recipeID });
        res.status(201).json({ message: 'Recipe saved successfully!', userRecipe });
    } catch (error) {
        console.error('Error saving recipe:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.get('/:username', async (req: Request, res: Response) => {
    const { username } = req.params;

    try {
        const savedRecipes = await UserRecipe.findAll({ where: { username } });
        res.status(200).json(savedRecipes);
    } catch (error) {
        console.error('Error fetching saved recipes:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export { router as userRecipeRouter };
