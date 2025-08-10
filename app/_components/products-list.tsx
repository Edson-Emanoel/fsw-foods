import { db } from "../_lib/prisma";
import ProductItem from "./product-item";

const ProductList = async () => {
    const products = await db.product.findMany({
        where: {
            discountPercentage: {
                gt: 0,
            }
        },
        take: 10, // Pega apenas 10 registros
        include: { // Inclui o "registro" do restaurante
            restaurant: {
                select: {
                    name: true
                }
            }
        }
    })

    return (
        <div className="flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden px-5">
            {products.map((product) => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    );
}
 
export default ProductList;