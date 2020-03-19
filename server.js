import express from "express";
import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";

import { typeDefs, resolvers } from "./graphql";

require("dotenv").config();

const app = express();
app.use(morgan("short"));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const port = 4444;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB Conected"))
  .catch(err => console.error(err));

const context = ({ req }) => {
  const authHeader = req.headers.authorization;

  let token;
  if (authHeader && authHeader.match(/^Bearer .*/)) {
    token = authHeader.split(" ")[1];
  }

  return { token };
};

const server = new ApolloServer({ typeDefs, resolvers, context });
server.applyMiddleware({ app });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  console.log(`Playground available at localhost:${port}${server.graphqlPath}`);
});
