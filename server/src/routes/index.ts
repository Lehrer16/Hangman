import apiRoutes from './api/index.js';
import dotenv from 'dotenv';
import { Router } from 'express';
import authRoutes from './auth-routes.js'
import { authenticateToken } from '../middleware/auth.js';


dotenv.config();

//TODO: import your routes
const router = Router();

router.use('/api', authenticateToken, apiRoutes); 
router.use('/auth', authRoutes)

export default router;