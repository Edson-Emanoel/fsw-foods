import { db } from "../_lib/prisma";
import RestaurantItem from "./restaurant-item";

const RestaurantList = async () => {
    // TODO: Pegar restaurantes com maior número de pedidos
    const restaurants = await db.restaurant.findMany({ take: 10 });

    return ( 
        <div className="flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden px-5">
            {restaurants.map((restaurant) => (
                <RestaurantItem restaurant={restaurant} key={restaurant.id} />
            ))}
        </div>
    );
}
 
export default RestaurantList;