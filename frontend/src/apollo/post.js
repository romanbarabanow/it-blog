import {gql} from "@apollo/client";

export const ALL_POSTS = gql`
  query{
    posts(name:"Roman"){
      id
      tittle
      text
      img_link
      name
  }
}
`