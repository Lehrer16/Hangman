import express from 'express';
import type { Request, Response } from 'express';
import { Cocktail } from '../../models/cocktail.js';

const router = express.Router();

//GET cocktails
router.get('/', async(_req: Request, res: Response) => {
    try {
        const cocktails = await Cocktail.findAll({
            attributes: {exclude: ['name']}
        });
        res.json(cocktails);
    } catch(error: any) {
        res.status(500).json({message: error.message})
    }
});

router.get('/:id', async(req: Request, res: Response) => {
    const { id } = req.params;
    try{
        const cocktail = await Cocktail.findByPk(id, {
            attributes: {exclude: ['name']}
        });
        if(cocktail) {
            res.json(cocktail);
        } else {
            res.status(404).json({message: 'Cocktail not found'})
        }

    } catch (error: any){
        res.status(500).json({message: error.message});
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const cocktail = await Cocktail.findByPk(id);
        if(cocktail) {
            await cocktail.destroy();
            res.json({message: 'Cocktail deleted'});
        } else {
            res.status(404).json({message: 'No cocktail found'});
        }
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
});

export {router as cocktailRouter};

