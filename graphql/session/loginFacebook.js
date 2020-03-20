import axios from "axios";

import { AuthenticationError } from "apollo-server-express";
import db from "../../db/";

export const loginFacebookResolver = async (parent, args, context) => {
  // Fetch app token to verify idToken
  const { idToken, email } = args;
  console.log("idToken:", idToken, "email", email);
  const { data: appToken } = await axios({
    url: `https://graph.facebook.com/oauth/access_token?client_id=${process.env.FACEBOOK_ID}&client_secret=${process.env.FACEBOOK_SECRET}&grant_type=client_credentials`,
    method: "GET"
  });

  // Fetch info on idToken using appToken
  const { data: userToken } = await axios({
    url: `https://graph.facebook.com/debug_token?input_token=${idToken}&access_token=${appToken.access_token}`,
    method: "GET"
  });

  // Error out if issuer doesn't match app's facebook id
  if (userToken.data.app_id !== process.env.FACEBOOK_ID)
    throw new AuthenticationError("Authorization denied");

  // Attempt to fetch user by facebookId
  let user = await db.User.findOne({
    facebookId: userToken.data.user_id
  });

  if (!user) throw new AuthenticationError("User does not exist");

  // Generate jwt and return user and token
  const token = createToken(user._id);
  return { id: user.id, user, token };
};
