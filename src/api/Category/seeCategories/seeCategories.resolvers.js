import client from "../../../client";

export default {
  Query: {
    seeCategories: (_, { page }) => client.category.findMany({
      include: {
        shops: {
          skip: (page - 1) * 2,
          take: 2,
          select: {
            id: true,
            name: true,
            latitude: true,
            longitude: true,
            user: true,
            photos: true
          }
        },
      }
    })
  }
}