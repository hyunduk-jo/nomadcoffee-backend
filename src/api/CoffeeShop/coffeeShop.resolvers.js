import client from "../../client";

export default {
  CoffeeShop: {
    user: ({ id }) => client.coffeeShop.findUnique({ where: { id } }).user(),
    categories: ({ id }) => client.coffeeShop.findUnique({ where: { id } }).categories()
  }
}