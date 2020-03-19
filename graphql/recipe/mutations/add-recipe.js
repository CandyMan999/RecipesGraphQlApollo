import db from "../../../db/models";

export const addRecipeResolver = async (parent, args) => {
  const { name, category, description, instructions, likes, username } = args;

  const addedRecipe = await db.Recipe.create({
    name,
    category,
    description,
    instructions,
    likes,
    username
  });

  return addedRecipe;
};
