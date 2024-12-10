
const typeDefs = `
  type User {
    _id: ID!
    password: String
    email: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input UserInput {
    email: String!
    password: String!
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
    me: User
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    removeScore(score: Int): User
}

`;

export default typeDefs;
