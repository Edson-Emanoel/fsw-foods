import { db } from "../_lib/prisma";

const RestaurantList = async () => {
    // TODO: Pegar restaurantes com maior número de pedidos
    const restaurants = await db.restaurant.findMany({ take: 10 });

    return ( 
        <div className="flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden px-5">
            {restaurants.map((restaurant) => (
                <div className="bg-blue-700">
                    <h1>{restaurant.name}</h1>
                </div>
            ))}
        </div>
    );
}
 
export default RestaurantList;