import express from 'express';
import type { Request, Response } from 'express';
import { Recipe } from '../../models/recipes.js';

const router = express.Router();

//GET recipes
router.get('/', async(_req: Request, res: Response) => {
    try {
        const recipes = await Recipe.findAll({
            attributes: {exclude: ['name']}
        });
        res.json(recipes);
    } catch(error: any) {
        res.status(500).json({message: error.message})
    }
});

router.get('/:id', async(req: Request, res: Response) => {
    const { id } = req.params;
    try{
        const recipes = await Recipe.findByPk(id, {
            attributes: {exclude: ['name']}
        });
        if(recipes) {
            res.json(recipes);
        } else {
            res.status(404).json({message: 'Recipe not found'})
        }

    } catch (error: any){
        res.status(500).json({message: error.message});
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const recipes = await Recipe.findByPk(id);
        if(recipes) {
            await recipes.destroy();
            res.json({message: 'Recipe deleted'});
        } else {
            res.status(404).json({message: 'No recipe found'});
        }
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
});

export {router as recipeRouter};