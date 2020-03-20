import { signupResolver } from "./signup";
import { loginDefs, loginResolver } from "./login";

export const sessionResolvers = {
  Mutation: {
    signup: signupResolver,
    login: loginResolver
  }
};

export const sessionDefs = [loginDefs];
