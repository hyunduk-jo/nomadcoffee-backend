import client from "../../../client";

export default {
  Query: {
    seeUsers: () => client.user.findMany()
  }
}