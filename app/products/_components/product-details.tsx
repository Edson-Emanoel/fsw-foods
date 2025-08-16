"use client"

import Image from "next/image";
import DiscountBadge from "@/app/_components/discount-badge";
import { calculateProductTotalPrice, formatCurrency } from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { BikeIcon, ChevronLeftIcon, ChevronRightIcon, TimerIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { useState } from "react";
import { Card } from "@/app/_components/ui/card";
import ProductList from "@/app/_components/products-list";

interface ProductDetailsProps {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: true
        }
    }>,
    complementaryProducts: Prisma.ProductGetPayload<{
        include: {
            restaurant: true
        }
    }>[];
}

const ProductDetails = ({product, complementaryProducts}: ProductDetailsProps) => {
    const [quantity, setQuantity] = useState(1)

    const handleIncreaseQuantityClick = () =>
        setQuantity(currentState => currentState + 1);
    const handleDecreaseQuantityClick = () =>
        setQuantity(currentState => {
            if(currentState === 1) return 1; 
            
            return currentState - 1;
        });

    return ( 
        <div className="relative z-50 mt-[-1.5rem] rounded-tl-lg rounded-tr-lg bg-white py-5 ">
            {/* Restaurante */}
            <div className="flex items-center gap-[0.375rem] px-5">
                <div className="relative h-4 w-4">
                    <Image
                        src={product.restaurant.imageUrl}
                        alt={product.restaurant.name}
                        fill
                        className="rounded-full object-cover"
                    />
                </div>
                <span className="text-xs text-muted-foreground">{product.restaurant.name}</span>
            </div>

            {/* Nome do Produto */}
            <h1 className="mb-3 mt-1 text-xl font-semibold px-5">{product.name}</h1>

            {/* Preço do Produto e Quantidade */}
            <div className="flex justify-between px-5">
                {/* Preço com Disconto */}
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold">
                            {formatCurrency(calculateProductTotalPrice(product))}
                        </h2>
                        {product.discountPercentage > 0 && (
                            <DiscountBadge product={product} />
                        )}
                    </div>

                    {/* Preço Original */}
                    {product.discountPercentage > 0 && (
                        <p className="text-sm text-muted-foreground line-through">
                            De: {formatCurrency(Number(product.price))}
                        </p>
                    )}
                </div>

                {/* Quantidade */}
                <div className="flex items-center gap-3 text-center">
                    <Button size="icon" variant="ghost" className="border border-solid border-muted-foreground" onClick={handleDecreaseQuantityClick}>
                        <ChevronLeftIcon />
                    </Button>
                    <span className="w-4">{quantity}</span>
                    <Button size="icon" onClick={handleIncreaseQuantityClick}>
                        <ChevronRightIcon />
                    </Button>
                </div>
            </div>

            {/* Dados da Entrega */}
            <div className="px-5">
                <Card className="mt-6 flex justify-around py-3">
                    {/* CUSTO */}
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 text-muted-foreground">
                            <span className="text-xs">Entrega</span>
                            <BikeIcon size={14} />
                        </div>
                        
                        {Number(product.restaurant.deliveryFee) > 0 ? (
                            <p className="text-xs font-semibold">
                                {formatCurrency(Number(product.restaurant.deliveryFee))}
                            </p>
                        ) : ( 
                            <p className="text-xs font-semibold">
                                Grátis
                            </p>
                        )}
                    </div>

                    {/* TEMPO */}
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 text-muted-foreground">
                            <span className="text-xs">Tempo</span>
                            <TimerIcon size={14} />
                        </div>
                        
                        <p className="text-xs font-semibold">
                             {product.restaurant.deliveryTimeMinutes} min
                        </p>
                    </div>
                </Card>
            </div>

            {/* Descricao */}
            <div className="mt-6 space-y-3 px-5">
                <h3 className="font-semibold">Sobre</h3>
                <p className="text-sm text-muted-foreground">
                    {product.description}
                </p>
            </div>

            {/* Lista de Sucos */}
            <div className="mt-6 space-y-3">
                <h3 className="font-semibold px-5">Sucos</h3>
                <ProductList products={complementaryProducts} />
            </div>

            <div className="px-5 mt-6">
                <Button className="w-full">Adicionar à sacola</Button>
            </div>
        </div>    
    );
}
 
export default ProductDetails;