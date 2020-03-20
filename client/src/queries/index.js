import { gql } from "apollo-boost";

// Recipes Queries
export const GET_ALL_RECIPED = gql`
  query {
    getAllRecipes {
      name
      description
      instructions
      category
      likes
      createdDate
    }
  }
`;

//Recipe Mutations

//User Queries

//User Mutations

export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      user {
        username
      }
    }
  }
`;

export const SIGNUP_FB = gql`
  mutation($email: String!, $idToken: String!) {
    signupFB(idToken: $idToken, email: $email) {
      user {
        facebookId
      }
    }
  }
`;
