import { gql } from "apollo-server-express";

export default gql`
  type MutationResult {
    ok: Boolean!,
    error: String
  },
  type User {
    id: Int!
    username: String!
    email: String!
    name: String!
    location: String!
    password: String!
    avatarUrl: String
    githubUsername: String
  },
  type Query {
    seeUsers: [User]
  },
  type Mutation {
    createAccount(username: String!,
    email: String!,
    name: String!,
    location: String,
    password: String!,
    avatarUrl: String,
    githubUsername: String): MutationResult!
  }
`;