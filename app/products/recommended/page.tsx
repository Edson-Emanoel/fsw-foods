import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";

const RecommendedProductsPage = async () => {
    // TODO: Pegar Produtos com mais pedidos
    const products = await db.product.findMany({
        where: {
            discountPercentage: {
                gt: 0,
            }
        },
        take: 20, // Pega apenas 10 registros
        include: { // Inclui o "registro" do restaurante
            restaurant: {
                select: {
                    name: true
                }
            }
        }
    })
    return (
        <>
            <Header />

            <div className="px-5 py-6">
                <h2 className="text-lg font-semibold mb-6">Produtos Recomendados</h2>
                <div className="grid grid-cols-2 gap-6">
                    {products.map((product) => (
                        <ProductItem
                            key={product.id}
                            product={product}
                            className="min-w-full"
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
 
export default RecommendedProductsPage;