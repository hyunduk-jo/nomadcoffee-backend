import client from "../../../client";

export default {
  Query: {
    seeProfile: async (_, { username }) => {
      const user = await client.user.findUnique({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: "User not found."
        }
      }
      return user;
    }
  }
}