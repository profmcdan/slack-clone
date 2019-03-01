const { gql } = require("apollo-server-express");

export default gql`
  type Team {
    owner: User!
    members: [User!]!
    channels: [Channel!]!
  }

  type Query {
    getAllTeams: [Team!]!
  }

  type Mutation {
    createTeam(name: String!): Boolean!
  }
`;
