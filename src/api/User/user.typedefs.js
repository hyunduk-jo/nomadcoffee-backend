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
    createdAt: String!
    updatedAt: String!
  },
  type Query {
    seeUsers: [User],
    seeProfile(username: String): User
  },
  type Mutation {
    createAccount(username: String!,
      email: String!,
      name: String!,
      location: String,
      password: String!,
      avatarUrl: String,
      githubUsername: String): MutationResult!,
    login(username: String!, password: String!): LoginResult!,
    editProfile(username: String, password: String, name: String, location: String, avatarUrl: Upload): MutationResult!,
  }
`;