import { gql } from "apollo-server-express";

export default gql`
  type MutationResult {
    ok: Boolean!,
    error: String
  },
  type LoginResult {
    ok: Boolean!,
    error: String,
    token: String
  },
  type User {
    id: Int!
    username: String!
    email: String!
    name: String!
    location: String!
    avatarUrl: String
    githubUsername: String
    following: [User]
    followedBy: [User]
    createdAt: String!
    updatedAt: String!
  }
`;