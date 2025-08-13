import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";

interface RestaurantItemProps{
    restaurant: Restaurant
}

const RestaurantItem = ({restaurant}: RestaurantItemProps) => {
    return  (
        <div className="min-w-[266px] max-w-[266px] space-y-3">
            {/* IMAGEM */}
            <div className="w-full h-[136px] relative">
                <Image src={restaurant.imageUrl} alt={restaurant.name} fill className="rounded-lg object-cover" />

                {/* Avaliação */}
                <div className="absolute gap-[2px] top-2 left-2 bg-white px-2 py-[2px] rounded-full flex items-center text-white">
                    <StarIcon size={12} className="fill-yellow-500 text-yellow-500" />
                    <span className="text-xs font-semibold">5.0</span>
                </div>

                <Button size="icon" className="absolute w-7 h-7 right-2 top-2 bg-white/20 rounded-full">
                    <HeartIcon className="fill-white" size={16} />
                </Button>
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
    )
}
 
export default RestaurantItem;