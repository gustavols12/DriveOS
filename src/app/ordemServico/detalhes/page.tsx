import { HiOutlineWrenchScrewdriver } from 'react-icons/hi2';
import { MyOrders } from '../components/showOs';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function DetalhesOs() {
  const session = await getServerSession(authOptions);
  const response = await prisma.service.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      product: true,
      customer: true,
    },
  });

  return (
    <section className="w-full max-w-7xl mx-auto shadow shadow-gray-300 rounded-xl p-6 mt-10">
      <div className="flex gap-4 items-center justify-center">
        <HiOutlineWrenchScrewdriver size={34} className="text-gray-800" />

        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Minhas O.S
        </h1>
      </div>
      <section>
        {response.length > 0 ? (
          <MyOrders order={response} session={session ? true : false} />
        ) : (
          <h2 className="text-gray-800 font-semibold mt-10 text-center">
            Nenhuma ordem de serviço encontrada...
          </h2>
        )}
      </section>
    </section>
  );
}
