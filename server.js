import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import path from "path";
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });
// app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

// Sync() to create all tables if they dont already exist in the database
models.sequelize.sync().then(() => {
  app.listen({ port: 8080 }, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
  });
});
