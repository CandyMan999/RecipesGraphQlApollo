import rootDefs from "./rootDefs.js";
import { recipeDataDefs, recipeDataResolvers } from "./recipe";
import { userDataDefs, userDataResolvers } from "./user";
import { sessionDefs, sessionResolvers } from "./session";

export const typeDefs = [
  rootDefs,
  ...sessionDefs,
  ...recipeDataDefs,
  ...userDataDefs
];

export const resolvers = {
  Query: {
    currentUser: userDataResolvers.Query.currentUser,
    getAllRecipes: recipeDataResolvers.Query.getAllRecipes
  },
  Mutation: {
    addRecipe: recipeDataResolvers.Mutation.addRecipe,
    signupUser: sessionResolvers.Mutation.signup,
    login: sessionResolvers.Mutation.login
  }
};
