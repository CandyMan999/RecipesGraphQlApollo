import { gql } from "apollo-server-express";
import db from "../../db/models";

export const recipeResolver = async (parent, args) => {
  return await db.Recipe.find();
};

export const recipeDefs = gql`
  type Recipe {
    _id: ID
    name: String!
    category: String!
    description: String!
    instructions: String!
    createdDate: String
    likes: Int
    username: String
  }
`;
