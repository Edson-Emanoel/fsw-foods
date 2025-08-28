import { Product } from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { CartContext, CartProduct } from "../_context/cart";
import { useContext } from "react";

interface CartItemProps {
    cartProduct: CartProduct
}

const CartItem = ({ cartProduct }: CartItemProps) => {
    const { increaseProductQuantity, decreaseProductQuantity, removeProductFromCart } = useContext(CartContext)

    const handleDecreaseProductQuantity = () => decreaseProductQuantity(cartProduct.id);
    const handleIncreaseProductQuantity = () => increaseProductQuantity(cartProduct.id);
    const handleRemoveClick = () => removeProductFromCart(cartProduct.id);

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                {/* Imagem e Info */} 
                <div className="w-20 h-20 relative">
                    <Image
                        src={cartProduct.imageUrl}
                        alt={cartProduct.name}
                        fill
                        className="rounded-lg object-cover"
                    />
                </div>

                <div className="space-y-1">
                    <h3 className="text-xs">{cartProduct.name}</h3>

                    <div className="flex items-center gap-1">
                        <h4 className="text-sm font-semibold">
                            {formatCurrency(calculateProductTotalPrice(cartProduct) * cartProduct.quantity)}
                        </h4>
                        {cartProduct.discountPercentage > 0 && (
                            <span className="text-xs line-through text-muted-foreground">
                                {formatCurrency(Number(cartProduct.price) * cartProduct.quantity) }
                            </span>
                        )}
                    </div>

                    {/* Quantidade */}
                    <div className="flex items-center gap-3 text-center">
                        <Button size="icon" variant="ghost" className="border border-solid border-muted-foreground w-7 h-7" onClick={handleDecreaseProductQuantity}>
                            <ChevronLeftIcon size={16} />
                        </Button>
                        <span className="w-4 text-sm">{Number(cartProduct.quantity)}</span>
                        <Button size="icon" className="w-7 h-7" onClick={handleIncreaseProductQuantity}>
                            <ChevronRightIcon size={16} />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Botão Remover */}
            <Button
                size="icon"
                variant="ghost"
                className="border border-solid border-muted-foreground w-7 h-7"
                onClick={handleRemoveClick}
            >
                <TrashIcon size={16} />
            </Button>
        </div>
    );
}
 
export default CartItem;