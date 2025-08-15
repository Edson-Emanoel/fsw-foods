import { Prisma } from "@prisma/client";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";
import { ArrowDownIcon } from "lucide-react";
import Link from "next/link";

interface ProductItemProps {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: {
                select: {
                    name: true
                }
            }
        }
    }>
}

const ProductItem = ({ product }: ProductItemProps) => {
    return (
        <Link className="w-[150px] min-w-[150px]" href={`/products/${product.id}`}>
            <div className="w-[150px] min-w-[150px] space-y-2">
                {/* Imagem */}
                <div className="h-[150px] w-full relative">
                    <Image
                        fill
                        alt={product.name}
                        src={product.imageUrl}
                        className="rounded-lg object-cover shadow-md"
                    />

                    {/* Disconto */}
                    {product.discountPercentage && (
                        <div className="absolute gap-[2px] top-2 left-2 bg-primary px-2 py-[2px] rounded-full flex items-center text-white">
                            <ArrowDownIcon size={12} />
                            <span className="text-xs font-semibold">{product.discountPercentage} %</span>
                        </div>
                    )}
                </div>

                {/* Outras Informações */}
                <div>
                    <h2 className="text-sm truncate">{product.name}</h2>

                    <div className="flex gap-1 items-center">
                        <h3 className="font-semibold">
                            {formatCurrency(Number(product.price))}
                        </h3>
                        {product.discountPercentage > 0 && (
                            <span className="line-through text-muted-foreground text-xs">
                                {formatCurrency(Number(product.price))}
                            </span>
                        )}
                    </div>

                    <span className="text-xs text-muted-foreground">
                        {product.restaurant.name}
                    </span>
                </div>
            </div>
        </Link>
    );
}
 
export default ProductItem;