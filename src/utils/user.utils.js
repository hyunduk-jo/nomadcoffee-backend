import JWT from 'jsonwebtoken';
import client from '../client';

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    /* const { id } = JWT.verify(token, process.env.JWT_SECRET);
    console.log(id); */
    const result = JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return null
      }
      return decoded
    })
    const user = await client.user.findUnique({ where: { id: result.id } });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    return null;
  }
}

export const protectedResolver = (ourResolver) => (root, args, context, info) => {
  if (!context.loggedInUser) {
    return {
      ok: false,
      error: "Login please."
    }
  }
  return ourResolver(root, args, context, info)
}