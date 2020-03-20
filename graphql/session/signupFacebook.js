import axios from "axios";

import { AuthenticationError } from "apollo-server-express";
import db from "../../db/models";
import { createToken } from "../../utils/auth";

export const signupFacebookResolver = async (parent, args, context) => {
  // Fetch app token to verify idToken
  const { idToken, email } = args;

  console.log("!!!!!!", idToken, email);
  const { data: appToken } = await axios({
    url: `https://graph.facebook.com/oauth/access_token?client_id=${process.env.FACEBOOK_ID}&client_secret=${process.env.FACEBOOK_SECRET}&grant_type=client_credentials`,
    method: "GET"
  });

  // Fetch info on idToken using appToken
  const { data: userToken } = await axios({
    url: `https://graph.facebook.com/debug_token?input_token=${idToken}&access_token=${appToken.access_token}`,
    method: "GET"
  });

  console.log("this is my userToken: ", userToken);

  // Error out if issuer doesn't match app's facebook id
  if (userToken.data.app_id !== process.env.FACEBOOK_ID)
    throw new AuthenticationError("Authorization denied");

  // Attempt to fetch user by facebookId
  let user = await db.User.findOne({
    facebookId: userToken.data.user_id
  });

  console.log("is User True???:", !!user);

  if (!!user) throw new AuthenticationError("User already exists");

  // If no user, create one off decoded token
  if (!user) {
    // parse name into first and last
    console.log("!!! trying to login!!!!", email, userToken.data.user_id);
    user = await db.User.create({
      email,
      facebookId: userToken.data.user_id
    });
  }
  console.log(user);
  // Generate jwt and return user and token
  const token = createToken(user._id);
  return { id: user._id, user, token };
};
