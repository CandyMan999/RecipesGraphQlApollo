import { gql } from "apollo-server-express";

export default gql`
  type Query {
    currentUser: User!
    getAllRecipes: [Recipe]
  }

  type Mutation {
    addRecipe(
      name: String!
      category: String!
      description: String!
      instructions: String!
      createdDate: String
      Likes: Int
      username: String
    ): Recipe

    signupUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    loginFacebook(idToken: String!): Auth
    signupFB(idToken: String!, email: String!): Auth
  }
`;
