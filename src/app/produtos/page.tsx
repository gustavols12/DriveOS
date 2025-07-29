import { redirect } from 'next/navigation';
import { FormProdutos } from './components/addProduct';
import { ListProducts } from './components/showProducts';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function Produtos() {
  const session = await getServerSession(authOptions);
  const res = await prisma.produto.findMany();

  if (!session || !session.user) {
    redirect('/');
  }
  return (
    <section className="w-full p-2 lg:p-8 flex flex-col items-center justify-center md:justify-items-start gap-2 ">
      <div className="w-11/12 flex flex-col rounded-lg ">
        <FormProdutos />
        <section className="my-8 sm:my-2 ">
          <ListProducts products={res} />
        </section>
      </div>
    </section>
  );
}
