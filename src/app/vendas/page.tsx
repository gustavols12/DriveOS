import { getServerSession } from 'next-auth';
import { Cart } from './components/cart';
import { authOptions } from '@/lib/auth';
import { GetCustomerData } from '@/utils/getCustomerData';
import { GetProductData } from '@/utils/getProductData';

export default async function Vendas() {
  const session = await getServerSession(authOptions);
  const { products } = await GetProductData();
  const { customers } = await GetCustomerData();
  return (
    <div className="w-full flex flex-col ">
      <h1 className="pt-8 mb-4 text-2xl font-bold text-center lg:text-left lg:px-8 text-gray-800">
        Iniciar Venda*
      </h1>
      {session ? (
        <Cart cartItem={products} clients={customers} />
      ) : (
        <>
          <h1 className="text-3xl font-bold text-center mt-4 text-gray-800">
            Realize o login para efetuar uma venda
          </h1>
        </>
      )}
    </div>
  );
}
