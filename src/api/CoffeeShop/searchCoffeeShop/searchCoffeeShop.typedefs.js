import { gql } from "apollo-server-core";

export default gql`
  type Query {
    searchCoffeeShop(term: String!): [CoffeeShop]
  }
`;