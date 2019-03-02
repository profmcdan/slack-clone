const { gql } = require("apollo-server-express");

export default gql`
  type Error {
    path: String!
    message: String
  }
`;
