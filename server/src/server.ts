import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import type { Request, Response } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { authenticateToken } from './services/auth-service.js';
import { typeDefs, resolvers } from './schemas/index.js';
import db from './config/connection.js';
import User from './models/user.js'; // Correctly import User model

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

// Define __dirname using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const startApolloServer = async () => {
  await server.start();
  await db;

  app.use(cors());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.options('/auth/login', cors());

  app.post('/auth/login', cors(), async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isPasswordValid = await user.isCorrectPassword(password);

      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = 'your-jwt-token'; // Replace with your JWT creation logic
      return res.json({ token });

    } catch (error) {
      console.error('Error authenticating user:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });

  app.use('/graphql', expressMiddleware(server as any, {
    context: authenticateToken as any
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();
