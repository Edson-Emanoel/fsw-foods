import Image from "next/image";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import { calculateProductTotalPrice, formatCurrency } from "@/app/_helpers/price";
import ProductImage from "../_components/product-image";
import DiscountBadge from "@/app/_components/discount-badge";

interface ProductPageProps{
    params: {
        id: string
    }
}

const ProductPage = async ({ params : { id } }: ProductPageProps) => {

    const product = await db.product.findUnique({
        where: {
            id
        },
        include: {
            restaurant: true
        }
    })

    if (!product) {
        return notFound()
    }

    return (
        <div>
            {/* Imagem */}
            <ProductImage product={product} />

            {/* Titulo e Preço */}
            <div className="p-5">
                {/* Restaurante */}
                <div className="flex items-center gap-[0.375rem]">
                    <div className="relative h-4 w-4">
                        <Image
                            src={product!.restaurant.imageUrl}
                            alt={product.restaurant.name}
                            width={0}
                            height={0}
                            className="rounded-full object-cover"
                        />
                    </div>
                    <span className="text-xs text-muted-foreground">{product.restaurant.name}</span>
                </div>

                {/* Nome do Produto */}
                <h1 className="mb-3 mt-1 text-xl font-semibold">{product.name}</h1>

                {/* Preço do Produto e Quantidade */}
                <div className="flex justify-between">
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
                </div>
            </div>
        </div>
    );
}
 
export default ProductPage;