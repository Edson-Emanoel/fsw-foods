import Header from "./_components/header";
import Search from "./_components/search";
import CategoryList from "./_components/category-list";
import Image from "next/image";
import ProductList from "./_components/products-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";

export default function Home() {
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>

      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="px-5 pt-6">
        <Image
          src="/promo-banner-01.png"
          alt="30% de desconto em Pizzas"
          width={0}
          height={0}
          className="h-auto w-full object-contain"
          sizes="100vw"
          quality={100}
        />
      </div>

      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5 mb-2">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit text-primary p-0 hover:bg-transparent"
          >
            Ver Todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>
        <ProductList />
      </div>
    </>
  );
}
