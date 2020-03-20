import { gql } from "apollo-server-express";
import { AuthenticationError } from "apollo-server-express";
import bcrypt from "bcrypt";

import { createToken } from "../../utils/auth";
import db from "../../db/models";

export const loginResolver = async (parent, args, context) => {
  const { email, password } = args;

  const user = await db.User.findOne({ email: email });

  const result = await bcrypt.compare(password, user.password);

  if (!result) throw new AuthenticationError("Authorization denied");

  const token = await createToken(user._id);

  return { user, token };
};

export const loginDefs = gql`
  type Auth {
    _id: ID!
    user: User!
    token: String!
  }
`;
