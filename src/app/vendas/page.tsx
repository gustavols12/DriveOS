import { Cart } from './components/cart';
import { prisma } from '@/lib/prisma';

export default async function Vendas() {
  const products = await prisma.produto.findMany();
  const clients = await prisma.customer.findMany();

  return (
    <div className="w-full flex flex-col ">
      <h1 className="pt-8 mb-4 text-2xl font-bold text-center lg:text-left lg:px-8 text-gray-800">
        Iniciar Venda
      </h1>

      <Cart cartItem={products} clients={clients} />
    </div>
  );
}
