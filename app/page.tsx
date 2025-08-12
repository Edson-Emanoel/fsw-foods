import Header from "./_components/header";
import Search from "./_components/search";
import CategoryList from "./_components/category-list";
import Image from "next/image";
import ProductList from "./_components/products-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/prommo-banner";

const Home = async () => {

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
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>

      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="px-5 pt-6">
        <PromoBanner
          src="/promo-banner-01.png"
          alt="30% de desconto em Pizzas"
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
        <ProductList products={products} />
      </div>

      <div className="px-5 pt-6">
        <PromoBanner src="/promo-banner-02.png" alt="A partir de R$15,90 em lanches!"  />
      </div>
    </>
  );
}

export default Home;