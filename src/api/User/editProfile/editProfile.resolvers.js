import bcrypt from 'bcrypt';
import client from '../../../client';
import { protectedResolver } from "../../../utils/user.utils";
import { uploadToS3 } from "../../../utils/upload.utils";

export default {
  Mutation: {
    editProfile: protectedResolver(async (_, { username, password, name, location, avatarUrl }, { loggedInUser }) => {
      //Check username duplicate
      const existUsername = await client.user.findUnique({ where: { username } });
      if (existUsername) {
        return {
          ok: false,
          error: "Username already taken."
        }
      }
      let newHashedPassword = undefined;
      if (password) {
        newHashedPassword = await bcrypt.hash(password, 10);
      }
      let newAvatarUrl = undefined;
      if (avatarUrl) {
        newAvatarUrl = await uploadToS3('avatar', avatarUrl, loggedInUser.username);
      }
      await client.user.update({
        where: { id: loggedInUser.id },
        data: {
          username,
          name,
          location,
          avatarUrl: newAvatarUrl,
          password: newHashedPassword
        }
      })
      return {
        ok: true
      }
    })
  }
}