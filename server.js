import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
// import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";

import models from "./models";

const app = express();

// Load and Merge Types and Resolvers
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./schema")));
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, "./resolvers"))
);

// Configure Middleware
app.use(cors("*"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

// Setup the Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models, user: { id: "be14c113-aa08-42ef-992d-4a117e88a704" } }
});
server.applyMiddleware({ app });

// Sync() to create all tables if they dont already exist in the database
// sync({ force: true })
models.sequelize.sync().then(() => {
  app.listen({ port: 8080 }, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
  });
});
