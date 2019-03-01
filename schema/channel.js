const { gql } = require("apollo-server-express");

export default gql`
  type Channel {
    id: String!
    name: String!
    public: Boolean!
    message: [Message!]!
    users: [User!]!
  }

  type Mutation {
    createChannel(
      teamId: String!
      name: String!
      public: Boolean = false
    ): Boolean!
  }
`;
