import { userDefs, userResolver } from "./user";

export const userDataResolvers = {
  Query: {
    currentUser: userResolver
  }
};

export const userDataDefs = [userDefs];
