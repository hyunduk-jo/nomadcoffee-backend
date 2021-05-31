import client from "../../../client";

export default {
  Query: {
    seeProfile: async (_, { username, page }) => {
      const row = 1;
      const user = await client.user.findUnique({
        where: { username },
        include: {
          followedBy: {
            skip: (page - 1) * row,
            take: row,
          },
          following: {
            skip: (page - 1) * row,
            take: row,
          },
        }
      });
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