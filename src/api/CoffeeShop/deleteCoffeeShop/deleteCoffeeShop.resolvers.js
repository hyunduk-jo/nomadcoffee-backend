import client from "../../../client";
import { protectedResolver } from "../../../utils/user.utils";

export default {
  Mutation: {
    deleteCoffeeShop: protectedResolver(async (_, { id }) => {
      try {
        const shop = await client.coffeeShop.findUnique({ where: { id } });
        if (!shop) {
          return {
            ok: false,
            error: "Shop not found."
          }
        }
        await client.coffeeShopPhoto.deleteMany({ where: { coffeeShopId: id } });
        await client.coffeeShop.delete({ where: { id } });
        return {
          ok: true
        }
      } catch (error) {
        console.log(error.message);
        return {
          ok: false,
          error: "Can't delete shop."
        }
      }
    })
  }
}