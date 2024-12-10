
const typeDefs = `
  type User {
    _id: ID!
    username: String
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
    addUser(email: String!, password: String!, username: String!): Auth
    login(email: String!, password: String!): Auth
    removeScore(score: Int): User
}

`;

export default typeDefs;
