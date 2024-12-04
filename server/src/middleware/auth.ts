// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// // Middleware to protect routes
// export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) return res.sendStatus(401);

//   const secretKey = process.env.JWT_SECRET_KEY || '';
//   jwt.verify(token, secretKey, (err: any, user: any) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// };

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Middleware to protect routes
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.sendStatus(401); // Unauthorized
    return; // Explicitly return to end execution
  }

  const secretKey = process.env.JWT_SECRET_KEY || '';
  jwt.verify(token, secretKey, (err: any, user: any) => {
    if (err) {
      res.sendStatus(403); // Forbidden
      return; // Explicitly return to end execution
    }

    req.user = user; // Attach user info to the request
    next(); // Proceed to the next middleware
  });

  return; // Explicitly return at the end of the function
};


