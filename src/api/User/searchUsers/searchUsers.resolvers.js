import client from "../../../client";

export default {
  Query: {
    searchUsers: (_, { term }) => client.user.findMany({
      where: {
        OR: [
          {
            username: {
              contains: term
            }
          },
          {
            email: {
              contains: term
            }
          }
        ]
      }
    })
  }
}