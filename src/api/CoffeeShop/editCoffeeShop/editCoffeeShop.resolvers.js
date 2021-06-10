import client from "../../../client";
import { uploadToS3 } from "../../../utils/upload.utils";
import { protectedResolver } from "../../../utils/user.utils";

export default {
  Mutation: {
    editCoffeeShop: protectedResolver(async (_, { id, name, latitude, longitude, photos }, { loggedInUser }) => {
      try {
        const oldShop = await client.coffeeShop.findUnique({ where: { id }, include: { categories: { select: { name: true } } } });
        if (!oldShop) {
          return {
            ok: false,
            error: "Shop not found."
          }
        }
        let photoUrl = undefined;
        if (photos[0]) {
          photoUrl = await uploadToS3("coffeeShopPhoto", photos, loggedInUser.username);
        }
        const slug = name.toLowerCase().split(" ").join("_");
        const editedShop = await client.coffeeShop.update({
          where: { id },
          data: {
            name,
            latitude,
            longitude,
            photos: photoUrl,
            categories: {
              disconnect: oldShop.categories,
              connectOrCreate: {
                where: { slug },
                create: {
                  name,
                  slug
                }
              }
            }
          }
        })
        console.log(editedShop);
        return {
          ok: true
        }
      } catch (error) {
        console.log(error.message);
        return {
          ok: false,
          error: "Can't edit. Try again."
        }
      }
    })
  }
}