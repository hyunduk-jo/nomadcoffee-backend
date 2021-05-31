import client from "../../../client";
import { protectedResolver } from "../../../utils/user.utils";

export default {
  Mutation: {
    unfollow: protectedResolver(async (_, { username }, { loggedInUser }) => {
      const user = await client.user.findUnique({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: "User not found."
        }
      }
      await client.user.update({
        where: { username },
        data: {
          followedBy: {
            disconnect: {
              username: loggedInUser.username
            }
          }
        }
      })
      return {
        ok: true
      }
    })
  }
}