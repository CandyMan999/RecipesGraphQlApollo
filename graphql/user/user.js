import { gql } from "apollo-server-express";

export const userResolver = async (parent, args) => {};

export const userDefs = gql`
  type User {
    _id: ID
    username: String!
    password: String!
    email: String!
    joinDate: String
    favorites: [Recipe]
  }
`;
