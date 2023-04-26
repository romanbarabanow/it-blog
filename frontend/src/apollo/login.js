import {gql} from "@apollo/client";



export const LOGIN = gql`
    mutation login($email: String!, $password: String!){
      login(email: $email,password: $password){
        token
        name
      }
    }
  `


export const INFO = gql`
  query info($token: String){
    info(token: $token){
      id
      name
      avatar_link
      description
    }
  }

`
