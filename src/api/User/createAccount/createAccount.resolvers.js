import client from "../../../client";
import bcrypt from 'bcrypt';

export default {
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
    }
  }
}