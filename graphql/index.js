import rootDefs from "./rootDefs.js";
import { recipeDataDefs, recipeDataResolvers } from "./recipe";
import { userDataDefs, userDataResolvers } from "./user";

export const typeDefs = [rootDefs, ...recipeDataDefs, ...userDataDefs];

export const resolvers = {
  Query: {
    currentUser: userDataResolvers.Query.currentUser,
    getAllRecipes: recipeDataResolvers.Query.getAllRecipes
  },
  Mutation: {
    addRecipe: recipeDataResolvers.Mutation.addRecipe
  }
};
