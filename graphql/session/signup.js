import { AuthenticationError } from "apollo-server-express";
import db from "../../db/models";

import { createToken } from "../../utils/auth";

export const signupResolver = async (
  parent,
  { username, email, password },
  { User }
) => {
  try {
    const userRes = await db.User.create({ username, email, password });
    const token = createToken(userRes._id);
    return { id: userRes._id, user: userRes, token };
  } catch (err) {
    console.log("error on signup", err);
    throw new AuthenticationError("User Already Exists");
  }
};
