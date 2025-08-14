// components/listProductsServer.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { GetCustomerData } from '@/utils/getCustomerData';
import { ListClient } from '../showClient';

export async function ListCustomerServer() {
  const session = await getServerSession(authOptions);
  const { customers } = await GetCustomerData();

  if (!session?.user || customers.length === 0) {
    return (
      <div className="mt-5 text-center">
        <p className="text-3xl text-gray-800 font-semibold">
          Nenhum cliente cadastrado
        </p>
      </div>
    );
  }

  return <ListClient clients={customers} />;
}
