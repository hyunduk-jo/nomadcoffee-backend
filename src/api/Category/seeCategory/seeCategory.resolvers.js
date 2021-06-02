import client from "../../../client";

export default {
  Query: {
    seeCategory: (_, { id, page }) => client.category.findUnique({
      where: {
        id
      },
      include: {
        shops: {
          skip: (page - 1) * 2,
          take: 2,
          select: {
            id: true,
            name: true,
            latitude: true,
            longitude: true
          }
        }
      }
    })
  }
}