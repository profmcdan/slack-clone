const { gql } = require("apollo-server-express");

export default gql`
  type Message {
    id: String!
    text: String!
    user: User!
    channel: Channel!
  }

  type Mutation {
    createMessage(channelId: String!, text: String!): Boolean!
  }
`;
