const typeDefs = `
  type Team{
    owner: User!
    members: [User!]!
    channels: [Channel!]!
  }

  type Channel{
    id: String!
    name: String!
    public: Boolean!
    message: [Message!]!
    users: [User!]!
  }

  type Message{
    id: String!
    text: String!
    user: User!
    channel: Channel!
  }

  type User {
    id: String!
    username: String!
    email: String!
    teams: [Team!]!
  }

  type Query{
    hi: String
  }

  type Mutation{
    
  }
`;

module.exports = typeDefs;
