import { Cart } from './components/cart';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Vendas() {
  const products = await prisma.produto.findMany();
  const clients = await prisma.customer.findMany();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/');
  }

  return (
    <div className="w-full flex flex-col ">
      <h1 className="pt-8 mb-4 text-2xl font-bold text-center lg:text-left lg:px-8 text-gray-800">
        Iniciar Venda
      </h1>
     
      <Cart cartItem={products} clients={clients} />
    </div>
  );
}
