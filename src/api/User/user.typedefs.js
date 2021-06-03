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
    coffeeShops: [CoffeeShop]
    following(page: Int!): [User]
    followedBy(page: Int!): [User]
    totalFollowedBy: Int!
    totalFollowing: Int!
    isMe: Boolean!
    isFollowing: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;