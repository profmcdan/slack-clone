import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import { ApolloServer, gql } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";

import typeDefs from "./schema";
import resolvers from "./resolvers";
import models from "./models";

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });
// app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

app.listen({ port: 8080 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});
