import client from "../../client";
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import { protectedResolver } from "../../utils/user.utils";
import { uploadToS3 } from "../../utils/upload.utils";

export default {
  Query: {
    seeUsers: () => client.user.findMany(),
    seeProfile: (_, { username }) => client.user.findUnique({ where: { username } })
  },
  Mutation: {
    createAccount: async (_, { username, email, name, location, password }) => {
      const existUsername = await client.user.findUnique({ where: { username } });
      if (existUsername) {
        return {
          ok: false,
          error: "Username already taken."
        }
      }
      const existEmail = await client.user.findUnique({ where: { email } });
      if (existEmail) {
        return {
          ok: false,
          error: "Email already taken."
        }
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await client.user.create({
        data: { username, email, name, location, password: hashedPassword }
      });
      console.log(newUser);
      return {
        ok: true
      }
    },
    login: async (_, { username, password }) => {
      const user = await client.user.findUnique({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: "User not found."
        }
      }
      const chkPassword = await bcrypt.compare(password, user.password);
      if (!chkPassword) {
        return {
          ok: false,
          error: "Wrong password."
        }
      }
      const token = JWT.sign({ id: user.id }, process.env.JWT_SECRET);
      return {
        ok: true,
        token
      }
    },
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