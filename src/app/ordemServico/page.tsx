import { prisma } from '@/lib/prisma';
import { OsForm } from './components/form';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { GetProductData } from '@/utils/getProductData';
import { GetCustomerData } from '@/utils/getCustomerData';

export default async function Os() {
  const session = await getServerSession(authOptions);
  const { products } = await GetProductData();
  const { customers } = await GetCustomerData();

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {session ? (
        <OsForm customers={customers} products={products} />
      ) : (
        <h1 className="text-3xl text-center font-bold text-gray-800 mt-10">
          Efetue o login para gerar uma ordem de serviço
        </h1>
      )}
    </div>
  );
}
