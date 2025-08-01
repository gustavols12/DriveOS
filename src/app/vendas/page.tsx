import { getServerSession } from 'next-auth';
import { Cart } from './components/cart';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export default async function Vendas() {
  const session = await getServerSession(authOptions);
  const products = await prisma.produto.findMany({
    where: {
      userId: session?.user.id,
    },
  });
  const clients = await prisma.customer.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <div className="w-full flex flex-col ">
      <h1 className="pt-8 mb-4 text-2xl font-bold text-center lg:text-left lg:px-8 text-gray-800">
        Iniciar Venda
      </h1>

      <Cart cartItem={products} clients={clients} />
    </div>
  );
}
