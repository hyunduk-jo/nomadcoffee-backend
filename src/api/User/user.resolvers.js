import client from "../../client"

export default {
  User: {
    totalFollowedBy: ({ id }) => client.user.count({ where: { following: { some: { id } } } }),
    totalFollowing: ({ id }) => client.user.count({ where: { followedBy: { some: { id } } } }),
    isMe: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false
      }
      if (id !== loggedInUser.id) {
        return false
      }
      return true
    },
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      const user = await client.user.findUnique({ where: { id }, include: { followedBy: { select: { id: true } } } });
      //user -> nate me -> johd321
      if (user.followedBy.filter(user => user.id === loggedInUser.id)[0]) {
        return true
      }
      return false
    },
    following: ({ id }, { page }) => client.user.findUnique({ where: { id } }).following({ take: 1, skip: (page - 1) * 1 }),
    followedBy: ({ id }, { page }) => client.user.findUnique({ where: { id } }).followedBy({ take: 1, skip: (page - 1) * 1 }),
    coffeeShops: ({ id }) => client.user.findUnique({ where: { id } }).coffeeShops(),
  }
}