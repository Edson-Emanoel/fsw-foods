import { Restaurant } from "@prisma/client";
import { BikeIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";

interface RestaurantItemProps{
    restaurant: Restaurant
}

const RestaurantItem = ({restaurant}: RestaurantItemProps) => {
    return  <div className="min-w-[266px] max-w-[266px] ">
        {/* IMAGEM */}
        <div className="w-full h-[136px] relative">
            <Image src={restaurant.imageUrl} alt={restaurant.name} fill className="object-cover" />
        </div>
        {/* TEXTO */}
        <div className="">
            <h3 className="text-sm font-semibold">{restaurant.name}</h3>
            {/* INFORMAÇÕES DA ENTREGA */}
            <div className="flex gap-3">
                {/* ENTREGA */}
                <div className="flex items-center gap-1">
                    <BikeIcon className="text-primary" size={14} />

                    <span className="text-xs text-muted-foreground">
                        {Number(restaurant.deliveryFee) === 0
                            ? "Entrega Gratuita"
                            : formatCurrency(Number(restaurant.deliveryFee)) }
                    </span>
                </div>

                {/* TEMPO DE ENTREGA */}
                <div className="flex items-center gap-1">
                    <TimerIcon className="text-primary" size={14} />

                    <span className="text-xs text-muted-foreground">
                       {restaurant.deliveryTimeMinutes} min
                    </span>
                </div>
            </div>
        </div>
    </div>
}
 
export default RestaurantItem;