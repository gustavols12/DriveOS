import { getServerSession } from 'next-auth';
import { FormProdutos } from './components/addProduct';
import { ListProducts } from './components/showProducts';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export default async function Produtos() {
  const session = await getServerSession(authOptions);
  const res = await prisma.produto.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <section className="w-full p-2 lg:p-8 flex flex-col items-center justify-center md:justify-items-start gap-2 ">
      <div className="w-11/12 flex flex-col rounded-lg mt-2 ">
        <FormProdutos />
        <section className="my-8 sm:my-2 ">
          {res.length > 0 && session?.user ? (
            <ListProducts products={res} />
          ) : (
            <div className="mt-5 text-center">
              <p className="text-3xl text-gray-800 font-semibold">
                Nenhum produto cadastrado
              </p>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
