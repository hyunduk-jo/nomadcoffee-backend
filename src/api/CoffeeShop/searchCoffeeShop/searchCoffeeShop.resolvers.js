import client from "../../../client"

export default {
  Query: {
    searchCoffeeShop: (_, { term }) => client.coffeeShop.findMany({
      where: {
        categories: {
          some: {
            slug: {
              contains: term
            }
          }
        }
      }
    })
  }
}