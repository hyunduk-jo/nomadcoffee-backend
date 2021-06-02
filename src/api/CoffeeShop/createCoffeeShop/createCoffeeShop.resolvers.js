import client from "../../../client";
import { uploadToS3 } from "../../../utils/upload.utils";
import { protectedResolver } from "../../../utils/user.utils";

export default {
  Mutation: {
    createCoffeeShop: protectedResolver(async (_, { name, latitude, longitude, photos }, { loggedInUser }) => {
      try {
        const slug = name.toLowerCase().split(" ").join("_");
        const newCoffeeShop = await client.coffeeShop.create({
          data: {
            name,
            latitude,
            longitude,
            user: {
              connect: {
                username: loggedInUser.username
              }
            },
            categories: {
              connectOrCreate: {
                where: {
                  slug
                },
                create: {
                  name,
                  slug
                }
              }
            }
          }
        })

        const uploadPhoto = await uploadToS3("coffeeShopPhoto", photos, loggedInUser.username);
        const newCoffeeShopPhoto = await client.coffeeShopPhoto.create({
          data:
          {
            url: uploadPhoto,
            shop: {
              connect: {
                id: newCoffeeShop.id
              }
            }
          }
        })
        //console.log(newCoffeeShopPhoto)
        return {
          ok: true
        }
      } catch (error) {
        console.log(error.message);
        return {
          ok: false,
          error: "Can't upload"
        }
      }
    })
  }
}