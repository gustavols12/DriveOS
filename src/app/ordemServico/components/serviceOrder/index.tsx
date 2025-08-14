import { GetProductData } from '@/utils/getProductData';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { GetCustomerData } from '@/utils/getCustomerData';
import { OsForm } from '../form';

export async function ServiceOrder() {
  const session = await getServerSession(authOptions);
  const { products } = await GetProductData();
  const { customers } = await GetCustomerData();

  if (!session?.user) {
    return (
      <div className="mt-5 text-center">
        <h1 className="text-3xl text-center font-bold text-gray-800 mt-10">
          Efetue o login para gerar uma ordem de serviço
        </h1>
      </div>
    );
  }

  return <OsForm customers={customers} products={products} />;
}
