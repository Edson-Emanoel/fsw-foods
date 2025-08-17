import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";

interface RestaurantsPageProps {
    params: {
        id: string;
    }
}

const RestaurantsPage = async ({ params: { id } }: RestaurantsPageProps) => {
    const restaurant = await db.restaurant.findUnique({
        where: {
            id: id
        }
    })

    if (!restaurant){
        return notFound()
    }

    return (
        <h1>Restaurante: {params.id}</h1>
    );
}
 
export default RestaurantsPage;