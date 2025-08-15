import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

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
            <div className="relative w-full h-[360px]">
                <Image
                    src={product!.imageUrl}
                    alt={product!.name}
                    fill
                    className="object-cover"
                />

                <Button className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white" size="icon">
                    <ArrowLeftIcon />
                </Button>
            </div>

            {/* Titulo e Preço */}
            <div>
                {/* Restaurante */}
                <div className="flex items-center gap-1">
                    <div className="relative h-4 w-4">
                        <Image
                            src={product!.restaurant.imageUrl}
                            alt=""
                            className="rounded-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ProductPage;