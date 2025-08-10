import { Product } from "@prisma/client";
import Image from "next/image";

interface ProductItemProps {
    product: Product
}

const ProductItem = ({ product }: ProductItemProps) => {
    return (
        <div className="w-[150px] h-[150px] space-y-2">
            <div></div>
        </div>
    );
}
 
export default ProductItem;