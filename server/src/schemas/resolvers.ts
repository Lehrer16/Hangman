// import type IUserContext from '../interfaces/UserContext.js';
// import type IUserDocument from '../interfaces/UserDocument.js';
// import { User } from '../models/index.js';
// import { signToken, AuthenticationError } from '../services/auth-service.js';

// const resolvers = {
//   Query: {
//     me: async (_parent: any, _args: any, context: IUserContext): Promise<IUserDocument | null> => {
      
//       if (context.user) {

//         const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
//         return userData;
//       }
//       throw new AuthenticationError('User not authenticated');
//     },
//   },
//   Mutation: {
//     addUser: async (_parent: any, args: any): Promise<{ token: string; user: IUserDocument }> => {
//       const user = await User.create(args);
//       const token = signToken(user.username, user.email, user._id);
            
//       return { token, user };
//     },
//     login: async (_parent: any, { email, password }: { email: string; password: string }): Promise<{ token: string; user: IUserDocument }> => {
//       const user = await User.findOne({ email });

//       if (!user || !(await user.isCorrectPassword(password))) {
//         throw new AuthenticationError('Invalid credentials');
//       }

//       const token = signToken(user.username, user.email, user._id);
//       return { token, user };
//     },
//   },
// };

// export default resolvers;

import IUserContext from '../interfaces/UserContext.js';
import IUserDocument from '../interfaces/UserDocument.js';
import { User } from '../models/index.js';
import { signToken, AuthenticationError } from '../services/auth-service.js';

const resolvers = {
    Query: {
        me: async (_parent: any, _args: any, context: IUserContext): Promise<IUserDocument | null> => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id }).select('-__v -password') as IUserDocument;
                return userData;
            }
            throw new AuthenticationError('User not authenticated');
        },
    },
    Mutation: {
        addUser: async (_parent: any, args: any): Promise<{ token: string; user: IUserDocument }> => {
            const user = await User.create(args);
            const token = signToken(user.username, user.email, user._id);
            return { token, user: user as IUserDocument };
        },
        login: async (_parent: any, { email, password }: { email: string; password: string }): Promise<{ token: string; user: IUserDocument }> => {
            const user = await User.findOne({ email }) as IUserDocument;

            if (!user || !(await user.isCorrectPassword(password))) {
                throw new AuthenticationError('Invalid credentials');
            }

            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },
    },
};

export default resolvers;