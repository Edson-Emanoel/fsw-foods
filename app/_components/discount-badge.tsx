import { Product } from "@prisma/client";
import { ArrowDownIcon } from "lucide-react";

interface DiscountBadgeProps {
    product: Pick<Product, "discountPercentage" | "price">
}

const DiscountBadge = ({ product }: DiscountBadgeProps) => {
    return (
        <div className="gap-[2px] bg-primary px-2 py-[2px] rounded-full flex items-center text-white">
            <ArrowDownIcon size={12} />
            <span className="text-xs font-semibold">{product.discountPercentage} %</span>
        </div>
    );
}
 
export default DiscountBadge 