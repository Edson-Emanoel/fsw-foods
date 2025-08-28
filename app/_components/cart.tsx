import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const Cart = () => {
    const { products, subtotalPrice, totalDiscounts, totalPrice } =
    useContext(CartContext);

    return (
        <div className="flex">
            <div className="space-y-4">
                {products.map((product) => (
                    <CartItem key={product.id} cartProduct={product}  />
                ))}
            </div>
            
            <div>
                {/* Totais */}
                <div className="mt-6">
                    <Card>
                        <CardContent className="space-y-4 p-5">
                            <div className="justify-between items-center flex">
                                <span className="text-xs text-muted-foreground">Subtotal</span>
                                <span>{formatCurrency(subtotalPrice)}</span>
                            </div>
                            <Separator className="h-[0.3px]"  />
                            <div className="justify-between items-center flex">
                                <span className="text-xs text-muted-foreground">Entrega</span>
                                    {Number(products[0].restaurant.deliveryFee) === 0
                                        ? <span className="uppercase text-primary font-medium">Grátis</span>
                                        : formatCurrency(Number(products[0].restaurant.deliveryFee))}
                            </div>
                            <Separator className="h-[0.3px]"  />
                            <div className="justify-between items-center flex">
                                <span className="text-xs text-muted-foreground">Descontos</span>
                                <span>- {formatCurrency(totalDiscounts)}</span>
                            </div>
                            <Separator className="h-[0.3px]"  />
                            <div className="justify-between items-center flex text-md text-black font-semibold">
                                <span>Total</span>
                                <span>{formatCurrency(totalPrice)}</span>
                            </div>
                        </CardContent>
                        </Card>
                </div>

                {/* Finaliza o pedido */}
                <Button className="w-full mt-6">
                    Finalizar Pedido
                </Button>
            </div>
        </div>
    );
}
 
export default Cart;