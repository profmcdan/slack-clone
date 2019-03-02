const { gql } = require("apollo-server-express");

export default gql`
  type User {
    id: String!
    username: String!
    email: String!
    teams: [Team!]!
  }

  type Query {
    getUser(id: String!): User!
    getUsers: [User!]!
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): Boolean!
  }
`;
