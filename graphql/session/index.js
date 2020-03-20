import { signupResolver } from "./signup";
import { loginDefs, loginResolver } from "./login";
import { signupFacebookResolver } from "./signupFacebook";

export const sessionResolvers = {
  Mutation: {
    signup: signupResolver,
    login: loginResolver,
    signupFacebook: signupFacebookResolver
  }
};

export const sessionDefs = [loginDefs];
