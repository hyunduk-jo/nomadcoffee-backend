import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import client from '../../../client';

export default {
  Mutation: {
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
  }
}