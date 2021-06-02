import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    seeCategory(id: Int, page: Int!): Category
  }
`;