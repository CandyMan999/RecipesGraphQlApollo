import { recipeDefs, recipeResolver } from "./recipe";
import { addRecipeResolver } from "./mutations";

export const recipeDataResolvers = {
  Query: {
    getAllRecipes: recipeResolver
  },
  Mutation: {
    addRecipe: addRecipeResolver
  }
};

export const recipeDataDefs = [recipeDefs];
