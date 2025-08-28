"use client"

import Image from "next/image";
import DiscountBadge from "@/app/_components/discount-badge";
import { calculateProductTotalPrice, formatCurrency } from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { useContext, useState } from "react";
import ProductList from "@/app/_components/products-list";
import DeliveryInfo from "@/app/_components/delivery-info";
import { CartContext } from "@/app/_context/cart";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/app/_components/ui/sheet";
import Cart from "@/app/_components/cart";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog";

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
    const [ quantity, setQuantity ] = useState(1)
    const [ isCartOpen, setIsCartOpen ] = useState(false)
    const [ isconfirmationDialogOpen, setIsConfirmationDialogOpen ] = useState(false)

    const { addProductToCart, products } = useContext(CartContext)

    const addToCart = () => {
        addProductToCart(product, quantity)
        setIsCartOpen(true)
    }

    const handleAddToCartClick = () => {
        // Verifica se há algum produto de outro restaurante no carrinho
        const hasDifferentRestaurantProduct = products.some(
            (cartProduct) => cartProduct.restaurantId !== product.restaurantId
        )
        
        // Se houver abrirá um aviso
        if(hasDifferentRestaurantProduct){
            setIsConfirmationDialogOpen(true)
        }

        addToCart()
    }

    const handleIncreaseQuantityClick = () =>
        setQuantity(currentState => currentState + 1);
    const handleDecreaseQuantityClick = () =>
        setQuantity(currentState => {
            if(currentState === 1) return 1; 
            
            return currentState - 1;
        });

    return ( 
        <>
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
                    <DeliveryInfo restaurant={product.restaurant} />
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
            </div>

            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                    <Button className="w-full" onClick={handleAddToCartClick}>
                        Adicionar à sacola
                    </Button>
                </SheetTrigger>
                <SheetContent className="w-[90vw]">
                    <SheetHeader>
                        <SheetTitle className="mb-3">Minha Sacola</SheetTitle>
                    </SheetHeader>

                    <Cart />
                </SheetContent>
            </Sheet>

            <Dialog open={isconfirmationDialogOpen} onOpenChange={setIsConfirmationDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Você só pode adicionar itens de um restaurante por vez</DialogTitle>
                    <DialogDescription>
                        Deseja adicionar esse produto ? Isso limpará sua sacola atual
                    </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose>
                            <Button variant="outline">
                                Não
                            </Button>
                        </DialogClose>

                        <Button variant="default" onClick={addToCart}>
                            Esvaziar sacola e adicionar o produto
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>   
    );
}
 
export default ProductDetails;