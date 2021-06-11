import client from "../../client";

export default {
  CoffeeShop: {
    user: ({ id }) => client.coffeeShop.findUnique({ where: { id } }).user(),
    categories: ({ id }) => client.coffeeShop.findUnique({ where: { id } }).categories(),
    photos: ({ id }) => client.coffeeShop.findUnique({ where: { id } }).photos(),
    totalShopNum: () => client.coffeeShop.count(),
    isMyShop: async ({ id }, _, { loggedInUser }) => {
      const shop = await client.coffeeShop.findUnique({ where: { id } });
      if (loggedInUser) {
        return shop.userId === loggedInUser.id
      } else {
        return false
      }
    }
  }
}